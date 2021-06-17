const Command = require('../../Structures/Command.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['up'],
      description: 'Check the uptime of bot!',
      usage: 'uptime',
    });
  }

  async run(message, args) {
    message.channel.send(`${this.bot.uptime / 1000} seconds!`);
  }
};
