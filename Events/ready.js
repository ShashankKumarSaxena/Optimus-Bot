const Event = require('../Structures/Event');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    run() {
        console.log([
            `Logged in as ${this.bot.user.tag}`,
            `Loaded ${this.bot.commands.size} commands!`,
            `Loaded ${this.bot.events.size} events`
        ].join('\n'));
        
        const activities = [
            `${this.bot.guilds.cache.size} Servers!`,
            `${this.bot.channels.cache.size} Channels!`,
            `${this.bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
        ];

        let i = 0;
        setInterval(() => this.bot.user.setActivity(`${this.bot.prefix}help | ${activities[i++ % activities.length]}`, {type: 'WATCHING'}), 15000);
    }
}