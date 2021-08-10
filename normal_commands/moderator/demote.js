module.exports = {
    name: 'demote',
    description: 'demote player, but you need Moderator Role in order to use this command',
    cooldown: 0.0001,
    usage: "<@user> <@role>",
    execute(message, args, Discord) {
        if (message.channel.id !== "864903369188180048") {
            return
        }
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to demote someone!');
        };
        let member = message.mentions.members.first();
        if (!message.member.roles.cache.has('861523420076179457')) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`There was an error trying to execute that command!`)
                .setDescription(`you need Moderator role in order to use this command`)
                .setColor("#ff0000")
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            message.channel.send(embed);
            return;
        }
        console.log(args);
        try {
            role = message.guild.roles.cache.find(r => r.toString() === args[1]);
            console.log(role.id)
            member.roles.add(role);
            // return message.channel.send({ embed });
        } catch (error) {
            role = message.guild.roles.cache.find(r => r.name === args[1]);
            console.log(role.id)
            member.roles.add(role);
            // return message.channel.send({ embed });
        }
        // message.channel.send(args + " is now the sus!");
        const embed = new Discord.MessageEmbed()
            .setTitle("Done")
            // .setAuthor(message.author.username)
            .setDescription(`${member} was demote from ${role}`)
            .setColor("#ff0000")
        // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
        // .addField("ID", message.author.id)
        // .addField("Creación", message.author.createdAt);
        message.channel.send(embed);


    },
};