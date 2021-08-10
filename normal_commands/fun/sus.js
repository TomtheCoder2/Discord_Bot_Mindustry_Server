// 861523420076179457 // moderator
// 865104128690880512 // admin

module.exports = {
    name: 'sus',
    description: 'give sus role!',
    cooldown: 60,

    execute(message, args, Discord) {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to make them sus!');
        }
        let member = message.mentions.members.first();
        if (member.roles.cache.has('861523420076179457') && message.member.roles.cache.has('865104128690880512')) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You cant make a Moderator+ sus!")
                .setColor("#ff0000")
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            message.channel.send(embed);
            return;
        } else {
            let role = message.guild.roles.cache.find(r => r.id === "864881045458911312");
            // let staff = message.guild.roles.get('861523420076179457').members.map(m => m.user.tag);
            // let membersWithRole = message.guild.members.filter(member => {
            //     return member.roles.find("name", "Moderator");
            // }).map(member => {
            //     return member.user.username;
            // })
            // The member you want to add the role to

            // console.log(membersWithRole)
            // Add role to the member
            member.roles.add(role);
            // return message.channel.send({ embed });

            // message.channel.send(args + " is now the sus!");
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username)
                .setDescription(args + " is now the sus!")
                .setColor("#ff0000")
            // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);
            message.channel.send(embed);
        }
    },
};
