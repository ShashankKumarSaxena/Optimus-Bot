'use strict';

const Command = require('../../Structures/Command.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['ping'],
      category: 'Info',
      description: 'Ping the bot',
      usage: 'ping',
    });
  }

  async run(message, args) {
    const msg = await message.channel.send('Pinging...');
    const latency = msg.createdTimestamp - message.createdTimestamp;

    msg.edit(`Bot Latency: \`${latency}ms\``);
  }
};
