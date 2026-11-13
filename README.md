# Северный Альянс — сайт

Сайт: https://shkiparez.github.io/severny-alyans/
Админка: https://shkiparez.github.io/severny-alyans/admin/

Все тексты, контакты, страны, грузы, шаги, цифры и отзывы лежат в `content.json`.
Админка правит этот файл через GitHub API, после сохранения GitHub Pages обновляет сайт за 1–2 минуты.

## Вход для владельца (логин и пароль)

Владелец входит в админку по логину и паролю. Под ними лежит ключ GitHub, зашифрованный паролем
(`admin/auth.json`, AES-GCM + PBKDF2). Без пароля расшифровать его нельзя.

Настройка (делает разработчик, один раз или при смене пароля):

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
   Repository access: **Only select repositories** → `severny-alyans`. Permissions → **Contents: Read and write**.
2. Открыть https://shkiparez.github.io/severny-alyans/admin/setup.html, вставить ключ.
   Логин и пароль сгенерируются сами — нажать «Создать вход» и передать их владельцу.

Забыли пароль или истёк ключ — повторить настройку, старый пароль перестанет работать.
Ключ утёк — отозвать его в GitHub и выпустить новый.

## Что нельзя поменять через админку

Видео на главном экране (`media/`), дизайн и структуру блоков — это правится в коде.
