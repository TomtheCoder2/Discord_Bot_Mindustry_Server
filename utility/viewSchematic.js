const replyEmbed = require('./interaction')
module.exports = function viewSchematic(message, name, Discord, client, interaction) {
    fs = require('fs');
    const util = require('util')
    const { Schematic } = require("mindustry-schematic-parser");
    // const replyEmbed = require('./utility/interaction')
    if (message) {

        try {
            inputbase64 = fs.readFileSync("./data/schematics/schematicFiles/" + name + ".msch", { encoding: 'base64' })
        } catch (err) {
            console.error(err);
            Errorembed = new Discord.MessageEmbed()
                .setTitle(`An error has occurred\n${err}`)
                .setColor("#ff0000")
            message.channel.send(Errorembed)
            console.error(err)
            return;
        }
        schematicName = fs.readFileSync(`./data/schematics/schematicNames/${name}.json`);
        schematicName = JSON.parse(schematicName);
        schematic = new Schematic.decode(inputbase64)
        cost = ''
        for (const [key, value] of Object.entries(schematic.requirements)) {
            console.log(`${key}: ${value}`);
            cost += `${client.emojis.cache.find(emoji => emoji.name === key.split("-").join(""))}: ${value}\n`
        }
        const schematicFileName = "./data/schematics/schematicFiles/" + schematic.name.split(" ").join("") + ".msch"
        const PNGFileName = "./data/schematics/schematicPNG/" + schematic.name.split(" ").join("") + ".png"
        const png = new Discord.MessageAttachment(`${PNGFileName}`);
        const schematicFile = new Discord.MessageAttachment(`${schematicFileName}`);
        const anotherEmbed = {
            title: `**Name:** ${schematic.name}`,
            description: `**Description:** ${schematic.description}`,
            color: "#ADD8E6",
            fields: [
                { name: "Cost: ", value: `${cost}`, inline: true },
                { name: "Power-Balance:  ", value: `${schematic.powerBalance}`, inline: true },
            ],
            image: {
                url: 'attachment://' + schematic.name.split(" ").join("") + ".png",
            },
            timestamp: new Date(),
        }
        if (schematicName.author) {
            anotherEmbed.author = {
                name: schematicName.author.name,
                icon_url: schematicName.author.icon_url
            }
        }
        // send the final message
        message.channel.send({ files: [png, schematicFileName], embed: anotherEmbed })
        console.log(schematic.name)
    } else {
        try {
            console.log(name)
            inputbase64 = fs.readFileSync("./data/schematics/schematicFiles/" + name + ".msch", { encoding: 'base64' })
        } catch (err) {
            console.error(err);
            Errorembed = new Discord.MessageEmbed()
                .setTitle(`An error has occurred\n${err}`)
                .setColor("#ff0000")
            replyEmbed(Errorembed)
            console.error(err)
            return;
        }
        schematicName = fs.readFileSync(`./data/schematics/schematicNames/${name}.json`);
        schematicName = JSON.parse(schematicName);
        schematic = new Schematic.decode(inputbase64)
        cost = ''
        for (const [key, value] of Object.entries(schematic.requirements)) {
            console.log(`${key}: ${value}`);
            cost += `${client.emojis.cache.find(emoji => emoji.name === key.split("-").join(""))}: ${value}\n`
        }
        const schematicFileName = "./data/schematics/schematicFiles/" + schematic.name.split(" ").join("") + ".msch"
        const PNGFileName = "./data/schematics/schematicPNG/" + schematic.name.split(" ").join("") + ".png"
        const png = new Discord.MessageAttachment(`${PNGFileName}`);
        const schematicFile = new Discord.MessageAttachment(`${schematicFileName}`);
        const anotherEmbed = {
            title: `**Name:** ${schematic.name}`,
            description: `**Description:** ${schematic.description}`,
            // color: "#ADD8E6",
            fields: [
                { name: "Cost: ", value: `${cost}`, inline: true },
                { name: "Power-Balance:  ", value: `${schematic.powerBalance}`, inline: true },
            ],
            image: {
                url: 'attachment://C:\\Users\\janwi\\Online_Mindustry_Community_bot\\data\\schematics\\schematicPNG\\' + schematic.name.split(" ").join("") + ".png",
            },
            timestamp: new Date(),
            type: 'rich',
        }
        console.log('C:\\Users\\janwi\\Online_Mindustry_Community_bot\\data\\schematics\\schematicPNG\\' + schematic.name.split(" ").join("") + ".png")
        if (schematicName.author) {
            anotherEmbed.author = {
                name: schematicName.author.name,
                icon_url: schematicName.author.icon_url
            }
        }
        // send the final message
        // console.log(anotherEmbed)
        // interaction.reply({ files: [png, schematicFileName], embed: anotherEmbed })
        // console.log(png)
        replyEmbed(interaction, anotherEmbed, client, [png, schematicFileName])
        // console.log(schematic.name)
    }
}