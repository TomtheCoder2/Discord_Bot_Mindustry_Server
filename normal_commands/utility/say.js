module.exports = {
    name: 'say',
    discription: 'say something in a channel',
    usage: "<channel id> <message parsed in JSON>",
    execute(message, args, Discord, client) {
        const sendEmbed = require('../../utility/sendEmbed');
        var example = require('../../utility/embed');
        // check if the author has the permission to run this command
        if (!message.member.roles.cache.has('861523420076179457')) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`There was an error trying to execute that command!`)
                .setDescription(`you need Moderator role in order to use this command`)
                .setColor("#ff0000")
            message.channel.send(embed);
            return;
        }
        if (args[0] == "example") {
            // show an example for all the noobs out there
            sendEmbed(message.channel, example)
            example_string = JSON.stringify(example, null, "\t");
            message.channel.send("This is the Code for the message above:")
            message.channel.send("```json\n" + example_string + "```");
            message.channel.send("For more information just ask Nautilus");
            return;
        }
        // get the channel
        channel = message.mentions.members.first();// i think i dont need this line
        channel = message.guild.channels.cache.get(args[0].replace('<#', '').replace('>', ''))
        // shift and join to convert the args to one long string
        args.shift();
        console.log(channel)
        const text = args.join(' ')
        // now try to convert to an object
        try {
            finalText = JSON.parse(text);
        } catch (err) {
            // catch if it doesnt work, lol
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
        // send the final embed
        sendEmbed(channel, finalText)
    },
};