'use strict';

const Command = require('../../Structures/Command.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ping'],
            category: 'Info',
            description: 'Ping the bot',
            usage: 'ping'
        });
    }

    async run(message, args) {
        let start = Date.now();
        let diff = (Date.now() - start);
        message.channel.send(`Pong! \`${diff}ms\``);
    }
}