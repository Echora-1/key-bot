const TelegramApi = require('node-telegram-bot-api')

const TELEGRAM_TOKEN = '5514413309:AAEe7ASPNhPsGJaxzweHC-Oorv3ZdYeGSz4'

const bot = new TelegramApi(TELEGRAM_TOKEN, {polling: true})

const buttons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🔑 Bay key', callback_data: 'bayKey'}, {text: '🔐 My key', callback_data: '/mayKey'}],
        ],
    })
}

const start = () => {
    bot.on('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const name = msg.chat.last_name;
        if(text ==='/start') {
            return  bot.sendMessage(chatId, `👋 ${name} welcome!`, buttons)
        }
        if(text ==='/bayKey') {
            return  bot.sendMessage(chatId, 'Key bay process')
        }
        return  bot.sendMessage(chatId, 'Unknown command')

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === 'bayKey') {
            return  bot.sendMessage(chatId, 'Key bay process')
        }
        return  bot.sendMessage(chatId, 'Unknown command')
    })
}

start();
