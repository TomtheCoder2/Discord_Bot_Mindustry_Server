const replyEmbed = require('../../utility/interaction')
const Discord = require("discord.js");
module.exports = {
    name: 'crash_interaction',
    description: 'crash the bot!',
    cooldown: 5,
    execute(interaction, client) {
        if (!message.member.roles.cache.has('865104128690880512') && message.author.id !== "687347431548911644") {
            const embed = new Discord.MessageEmbed()
                .setTitle(`There was an error trying to execute that command!`)
                .setDescription(`you need Admin role in order to use this command`)
                .setColor("#ff0000")
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            message.channel.send(embed);
            return;
        }
        const embed = new Discord.MessageEmbed()
            .setTitle(`The bot crashed!`)
            .setColor("#ff0000")
        // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
        // .addField("ID", message.author.id)
        // .addField("Creación", message.author.createdAt);
        replyEmbed(interaction, embed)
        setTimeout(function () {
            process.exit(0);
        }, 300);
        return
    },
};
