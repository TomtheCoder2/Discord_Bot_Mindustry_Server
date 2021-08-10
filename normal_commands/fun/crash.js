module.exports = {
    name: 'crash',
    description: 'crash the bot!',
    cooldown: 5,
    execute(message, args, Discord, client) {
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
        message.channel.send(embed);
        setTimeout(function () {
            process.exit(0);
        }, 300);
        return
    },
};
