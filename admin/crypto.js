// Шифрование ключа GitHub логином и паролем (AES-GCM, ключ из PBKDF2-SHA256).
// Файл auth.json публичный, но без верного логина и пароля из него ничего не достать.
const SA_ITER = 600000;
const saB64 = u8 => { let s = ''; u8.forEach(b => s += String.fromCharCode(b)); return btoa(s); };
const saUnB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

async function saDeriveKey(login, password, salt, iter) {
  const base = await crypto.subtle.importKey('raw',
    new TextEncoder().encode(login.trim().toLowerCase() + ':' + password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

async function saEncrypt(secret, login, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await saDeriveKey(login, password, salt, SA_ITER);
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(secret)));
  return { v: 1, iter: SA_ITER, salt: saB64(salt), iv: saB64(iv), data: saB64(data) };
}

async function saDecrypt(blob, login, password) {
  const key = await saDeriveKey(login, password, saUnB64(blob.salt), blob.iter || SA_ITER);
  const out = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: saUnB64(blob.iv) }, key, saUnB64(blob.data));
  return new TextDecoder().decode(out);
}

function saGenPassword(n = 14) {
  const abc = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const r = crypto.getRandomValues(new Uint32Array(n));
  let p = '';
  for (let i = 0; i < n; i++) p += abc[r[i] % abc.length];
  return p.slice(0, 4) + '-' + p.slice(4, 9) + '-' + p.slice(9);
}
