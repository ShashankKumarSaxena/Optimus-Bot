const Permissions = require('discord.js');

module.exports = class Command {
    constructor(bot, name, options = {}) {
        this.bot = bot;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || 'No help provided...';
        
    }
}