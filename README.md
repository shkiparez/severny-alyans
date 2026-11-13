# Северный Альянс — сайт

Сайт: https://shkiparez.github.io/severny-alyans/
Админка: https://shkiparez.github.io/severny-alyans/admin/

Все тексты, контакты, страны, грузы, шаги, цифры и отзывы лежат в `content.json`.
Админка правит этот файл через GitHub API, после сохранения GitHub Pages обновляет сайт за 1–2 минуты.

## Как выдать владельцу ключ доступа

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Repository access: **Only select repositories** → `severny-alyans`.
3. Permissions → Repository permissions → **Contents: Read and write** (остальное не трогать).
4. Срок действия — на выбор (например, 1 год). Скопировать ключ и передать владельцу.

Ключ даёт доступ только к этому репозиторию. Если ключ утёк — отозвать его там же и выпустить новый.

## Что нельзя поменять через админку

Видео на главном экране (`media/`), дизайн и структуру блоков — это правится в коде.
