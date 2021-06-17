const BotClient = require('./Structures/BotClient.js');
const config = require('./config.json');

const bot = new BotClient(config);
bot.start();
