const Event = require('../../Structures/Event');

module.exports = class extends Event {
    async run(message) {
        const mentionRegex = RegExp(`^<@!?${this.bot.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!?${this.bot.user.id}> `);

        if (message.author.bot) return;

        if (message.content.match(mentionRegex)) message.channel.send(`My prefix is \`${this.bot.prefix}\`.`);

        const prefix = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.bot.prefix;
        
        if (!message.content.startsWith(prefix)) return;

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.bot.commands.get(cmd.toLowerCase()) || this.bot.commands.get(this.bot.aliases.get(cmd.toLowerCase()));
        if (command) {
            // Will add some checks here later on...
            command.run(message, args);
        }
    }
};