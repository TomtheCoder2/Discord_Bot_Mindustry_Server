// 864881045458911312

module.exports = {
    name: 'unsus',
    description: 'remove the sus role!',
    cooldown: 0.0001,
    execute(message, args, Discord) {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to remove the sus role!');
        }
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
        if (!member.roles.cache.has('864881045458911312')) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`${member} doesnt have the sus role!`)
                .setColor("#ff0000")
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            message.channel.send(embed);
            return;
        } else {
            let role = message.guild.roles.cache.find(r => r.id === "865962131119407147");
            // let staff = message.guild.roles.get('861523420076179457').members.map(m => m.user.tag);
            // let membersWithRole = message.guild.members.filter(member => {
            //     return member.roles.find("name", "Moderator");
            // }).map(member => {
            //     return member.user.username;
            // })
            // The member you want to add the role to

            // console.log(membersWithRole)
            // Add role to the member
            member.roles.remove(role);
            // return message.channel.send({ embed });

            // message.channel.send(args + " is now the sus!");
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username)
                .setDescription(`removed the sus role from ${member}`)
                .setColor("#ff0000")
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            message.channel.send(embed);
        }
    },
};
