const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');
const  UserModel = require('./models')
const TELEGRAM_TOKEN = '5514413309:AAEe7ASPNhPsGJaxzweHC-Oorv3ZdYeGSz4';

const bot = new TelegramApi(TELEGRAM_TOKEN, {polling: true});

const buttons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🔑 Bay key', callback_data: 'bayKey'}, {text: '🔐 My key', callback_data: 'mayKey'}],
        ],
    })
}

const button = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '🔑 Bay key', callback_data: 'bayKey'}],
        ],
    })
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log("Ошибка подключения к бд", e)
    }

    const user = await UserModel.findAll();
    console.log(user)

    bot.on('message',async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const name = msg.chat.first_name;
        try {
            if(text ==='/start') {
                await UserModel.findOrCreate({
                    where: { chatId },
                });
                return  bot.sendMessage(chatId, `👋 ${name} welcome!`, buttons)
            }
            return  bot.sendMessage(chatId, 'Unknown command')
        } catch (e) {
            return  bot.sendMessage(chatId, `Error try again ${e}`)
        }


    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        try {
            if(data === 'bayKey') {
                const user = await UserModel.findOne({ where: { chatId } })
                if(!user.key) {
                    bot.sendMessage(chatId, 'Key bay process...')
                    user.key = String(Math.random()).split('.')[1]
                    await user.save();
                    await bot.sendMessage(chatId, `Your key:`)
                    await bot.sendMessage(chatId, `${user.key}`)
                    return
                }
                    return bot.sendMessage(chatId, 'You already have a key')
            }
            if(data === 'mayKey') {
                const user = await UserModel.findOne({ where: { chatId } })
                if(user.key) {
                    await bot.sendMessage(chatId, 'Your key:')
                    return await bot.sendMessage(chatId, `${user.key}`)
                }
                return  bot.sendMessage(chatId, 'You don\'t have a key', button)
            }
        } catch (e) {
            return  bot.sendMessage(chatId, 'Error try again')
        }

        return  bot.sendMessage(chatId, 'Unknown command')
    })
}

start();
