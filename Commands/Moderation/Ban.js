const Command = require('../../Structures/Command.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "ban",
            description: "Ban a member from server"
        });
    }

    async run(message, args) {
        const { member, mentions } = message;
        if (!member.bannable) {
            message.channel.send("I can't ban this member due to lack of permissions!");
            return
        }
        if(
            member.hasPermission('ADMINISTRATOR') || 
            member.hasPermission('KICK_MEMBER')
        ){
            const target = message.guild.members.cache.get(mentions.users.first().id);
            if (target) {
                tag = `<@${target.id}>`
                target.ban();
                message.channel.send(`${tag} has been banned from this server!`);
            }else{
                message.channel.send("No member found!");
            }
        }
        else{
            message.channel.send("You don't have permission to use this command!");
        }
    }
}