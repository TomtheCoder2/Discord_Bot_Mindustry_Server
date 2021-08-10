module.exports = {
    name: 'say_interaction',
    discription: 'say something in a channel',
    usage: "<channel id> <message parsed in JSON>",
    execute(message, args, Discord, client) {
        const sendEmbed = require('../../utility/sendEmbed');
        var example = require('../../utility/embed');
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
        if (args[0] == "example") {
            // const channel = client.channels.cache.get(args.shift());
            console.log(example)
            // const text = example.join(' ')
            // const finalText = JSON.parse(example);
            sendEmbed(message.channel, example)
            example_string = JSON.stringify(example, null, "\t");
            message.channel.send("This is the Code for the message above:")
            message.channel.send("```json\n" + example_string + "```");
            message.channel.send("For more information just ask Nautilus");
            return;
        }

        // function sendEmbed(channel, embed, files = undefined, content = undefined) {
        //     return channel.send({ embed: embed, files, content });
        // }
        // channel = client.channels.cache.get(args.shift());
        channel = message.mentions.members.first();
        channel = message.guild.channels.cache.get(args[0].replace('<#', '').replace('>', ''))
        args.shift();
        console.log(channel)
        // const channel = message.
        const text = args.join(' ')
        try {
            finalText = JSON.parse(text);
        } catch (err) {
            console.error(err)
            embed = new Discord.MessageEmbed()
                .setTitle(`There was an error trying to execute that command!`)
                .setDescription(`${err}`)
                .setColor("#ff0000")
            message.channel.send(embed);
            return
        }
        embed = new Discord.MessageEmbed()
            .setTitle("Done")
            .addField("Channel: ", channel)
            .addField("Message: ", text)
        message.channel.send(embed);
        sendEmbed(channel, finalText)
    },
};