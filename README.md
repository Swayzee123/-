# MATCH SHOP Bot

Telegram-магазин в стиле «гильдия цифровых артефактов» с вебаппом, корзиной и оплатой.

## Возможности

- Вебапп открывается прямо в Telegram
- Каталог: AI, Музыка, Работа, Игры (цены в USD)
- Корзина с подсчётом итого
- Два способа оплаты:
  - Карта (Visa/MasterCard) — конвертируется в крипту
  - Криптовалюта (BTC, ETH, USDT и др.)
- NOWPayments API — мерчант получает крипту
- Бот получает уведомление об оплате

## Запуск

`ash
pip install -r requirements.txt
cp .env.example .env
# Заполни .env (BOT_TOKEN, NOWPAYMENTS_API_KEY)
py server.py
`

## NOWPayments

1. Регистрация: https://nowpayments.io
2. Получи API-ключ и IPN-секрет
3. Впиши в .env
4. Для теста: NOWPayments имеет тестовый режим

## Деплой

1. Задеплой папку webapp/ на HTTPS (Vercel, Netlify, свой сервер)
2. Или используй Telegram Bot Platform: /newapp в BotFather
3. Включи ngrok для IPN-колбэков: ngrok http 8080
4. Настрой Menu Button: /setmenubutton в BotFather

## Как работает оплата

1. Пользователь выбирает товары → корзина → «Оплатить»
2. Выбор: карта или крипта
3. Сервер создаёт NOWPayments invoice
4. NOWPayments показывает платёжную страницу
5. Оплата проходит → IPN-колбэк → бот уведомляет

Карта автоматически конвертируется в крипту (USDT TRC-20).
