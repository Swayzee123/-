import asyncio
import json
import logging
import os
from pathlib import Path
from dotenv import load_dotenv
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.ext import Application, CallbackQueryHandler, CommandHandler, ContextTypes, MessageHandler, filters

load_dotenv()
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logging.getLogger('httpx').setLevel(logging.WARNING)

BRAND = 'MATCH SHOP'
WEB_APP_URL = os.getenv('WEB_APP_URL', '')

PRODUCTS = {
    'ai': ('✦ Свитки разума', [
        ('ChatGPT', 'Официальная подписка', '1 месяц', 16),
        ('Claude', 'Официальный доступ', '1 месяц', 13),
        ('Perplexity', 'Поиск и исследования', '1 месяц', 10),
    ]),
    'music': ('♫ Ларцы бардов', [
        ('Spotify', 'Подарочный код', '1–12 месяцев', 10),
        ('YouTube Premium', 'Официальный код', '1 месяц', 8),
        ('Apple Music', 'Подарочный код', '1–12 месяцев', 11),
    ]),
    'work': ('⚒ Инструменты мастера', [
        ('Canva Pro', 'Официальный план', '1 месяц', 12),
        ('Notion', 'Настройка и шаблоны', 'разово', 18),
        ('Microsoft 365', 'Лицензия', '1 год', 50),
    ]),
    'play': ('◈ Зеркала иллюзий', [
        ('Steam', 'Подарочные карты', 'разово', 14),
        ('PlayStation', 'PSN кошелек', 'разово', 15),
        ('Xbox', 'Game Pass и карты', '1 месяц', 15),
    ]),
}


def home_menu():
    rows = []
    if WEB_APP_URL:
        rows.append([InlineKeyboardButton('✦ Открыть MATCH SHOP', web_app=WebAppInfo(url=WEB_APP_URL))])
    rows.extend([[InlineKeyboardButton(name, callback_data='cat:' + key)] for key, (name, _) in PRODUCTS.items()])
    rows.append([InlineKeyboardButton('❔ Как получить', callback_data='how')])
    return InlineKeyboardMarkup(rows)


def category_menu(category):
    _, items = PRODUCTS[category]
    rows = [[InlineKeyboardButton(item[0] + ' \u2014 ' + str(item[3]) + ' USD', callback_data='item:' + category + ':' + str(i))] for i, item in enumerate(items)]
    rows.append([InlineKeyboardButton('\u2190 Все', callback_data='home')])
    return InlineKeyboardMarkup(rows)


def back_menu():
    buttons = []
    if WEB_APP_URL:
        buttons.append([InlineKeyboardButton('✦ Открыть MATCH SHOP', web_app=WebAppInfo(url=WEB_APP_URL))])
    buttons.append([InlineKeyboardButton('\u2190 Главная', callback_data='home')])
    return InlineKeyboardMarkup(buttons)


async def start(update, context):
    name = update.effective_user.first_name if update.effective_user else 'искатель'
    text = '*' + BRAND + '*\n\nПривет, ' + name + '. Открой магазин.'
    if WEB_APP_URL:
        await update.message.reply_text(text, parse_mode='Markdown',
            reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton('✦ Открыть MATCH SHOP', web_app=WebAppInfo(url=WEB_APP_URL))]]))
    else:
        await update.message.reply_text(text, parse_mode='Markdown', reply_markup=home_menu())


async def menu(update, context):
    await update.message.reply_text('*' + BRAND + '*\nВыбери:', parse_mode='Markdown', reply_markup=home_menu())


async def edit_msg(query, text, keyboard):
    try:
        await query.edit_message_caption(caption=text, parse_mode='Markdown', reply_markup=keyboard)
    except Exception:
        await query.edit_message_text(text, parse_mode='Markdown', reply_markup=keyboard)


async def buttons(update, context):
    query = update.callback_query
    await query.answer()
    data = query.data
    if data == 'home':
        await edit_msg(query, '*' + BRAND + '*\n\nВыбери зал:', home_menu())
    elif data == 'how':
        await edit_msg(query, '*Как получить*\n\n1. Открой магазин.\n2. Выбери товар.\n3. Добавь в корзину, оплати.\n\nКарта конвертируется в крипту автоматически.', back_menu())
    elif data.startswith('cat:'):
        cat = data.split(':')[1]
        name, _ = PRODUCTS[cat]
        await edit_msg(query, '*' + name + '*\n\nВыбери:', category_menu(cat))
    elif data.startswith('item:'):
        parts = data.split(':')
        cat = parts[1]
        idx = int(parts[2])
        item = PRODUCTS[cat][1][idx]
        await edit_msg(query, '*' + item[0] + '*\n\n' + item[1] + '\nСрок: *' + item[2] + '*\nЦена: *' + str(item[3]) + ' USD*\n\nОткрой магазин для покупки.', back_menu())


async def webapp_data(update, context):
    data = update.effective_message.web_app_data
    if not data:
        return
    try:
        order = json.loads(data.data)
    except json.JSONDecodeError:
        return
    if order.get('action') != 'order':
        return
    items = order.get('items', [])
    if not items:
        return
    user = update.effective_user
    lines = ['\U0001f4e6 *\u041d\u043e\u0432\u044b\u0439 \u0437\u0430\u043a\u0430\u0437* \u043e\u0442 ' + user.first_name + ' (@' + (user.username or '--') + '):\n']
    total = 0
    for item in items:
        lines.append('- ' + item['name'] + ' \u2014 ' + item['duration'] + ' \u2014 *' + str(item['price']) + ' USD*')
        total += item.get('price', 0)
    lines.append('\n\U0001f4b0 *\u0418\u0442\u043e\u0433\u043e: ' + str(total) + ' USD*')
    await update.message.reply_text('\n'.join(lines), parse_mode='Markdown')


def run():
    token = os.getenv('BOT_TOKEN')
    if not token:
        raise RuntimeError('BOT_TOKEN not found')
    asyncio.set_event_loop(asyncio.new_event_loop())
    global _app
    _app = Application.builder().token(token).build()
    app = _app
    app.add_handler(CommandHandler('start', start))
    app.add_handler(CommandHandler('menu', menu))
    app.add_handler(CallbackQueryHandler(buttons))
    app.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, webapp_data))
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    run()
