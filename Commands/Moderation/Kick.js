const Command = require('../../Structures/Command.js')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['kick'],
            description: "Kick a member from server"
        });
    }

    async run(message, args) {
        const { member, mentions } = message;
        const tag = `<@${member.id}>`
        if (!member.kickable) {
            message.channel.send("I can't kick this member due to lack of permissions!");
            return
        }
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS'))
            {
                const target = mentions.users.first();
                if (target){
                    const targetMember = message.guild.members.cache.get(target.id);
                    targetMember.kick();
                    message.channel.send(`${tag} member has been kicked!`);
                }else{
                    message.channel.send("Please specify someone to kick!");
                }
            }
        else{
            message.channel.send('You do not have permissions to kick members!');
        }
    }
}