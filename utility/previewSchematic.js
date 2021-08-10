module.exports = function previewSchematic(message, inputbase64, Discord, client, interaction) {
    if (message) {
        fs = require('fs');
        const util = require('util')
        const { Schematic } = require("mindustry-schematic-parser");
        // base64 = 'bXNjaAF4nE2N227CMAyGf9KjhrRpSNznBXqFtBfhCUJjUBEklUkH7NG5oDhppWHH+Rwf/iBDqZA7cyZ8b24/emuc1cHrbcumx9LSpeWuD513WL899MFrvWOxGh/9cPol7v6IJfdX4sZ5S/jqnJQD2ebiBYzPwVni/clfm4MJhPo4uDZJl/NEyX6IrHYmCO8AVvi3RTpQdQWMT6hxlBBKVYlLZ3zMo9mEHKleFDHN0vYiQjxPW6koUQjyNFVKVsSOmiSiOqr5A7myCUlZzcovD0488Q==';
        const schematic = Schematic.decode(inputbase64);
        // debug the different proprerties
        console.log('name: ', schematic.name);
        console.log('description: ', schematic.description);
        console.log('power balance: ', schematic.powerBalance);
        console.log('item cost:', schematic.requirements);
        console.log('Mindustry Version:', schematic.version);
        // show the cost of the schem
        cost = ''
        for (const [key, value] of Object.entries(schematic.requirements)) {
            console.log(`${key}: ${value}`);
            cost += `${client.emojis.cache.find(emoji => emoji.name === key.split("-").join(""))}: ${value}\n`
        }
        //create the embed messsage<>:"/\|?*
        const schematicFileName = "./data/schematics/schematicFiles/" + schematic.name.replace(/[^a-zA-Z ]/g, "").split(" ").join("") + ".msch"
        fs.writeFileSync(schematicFileName, Buffer.from(schematic.base64, 'base64'))
        const fileName = "./data/schematics/schematicPNG/" + schematic.name.replace(/[^a-zA-Z ]/g, "").split(" ").join("") + ".png"
        let data = JSON.stringify(schematic);
        fs.writeFileSync("./data/schematics/schematicData/" + schematic.name.replace(/[^a-zA-Z ]/g, "").split(" ").join("") + ".json", data);
        fs.writeFileSync("./data/schematics/schematicNames/" + schematic.name.replace(/[^a-zA-Z ]/g, "").split(" ").join("") + ".json", `{"name":"${schematic.name}", "author": { "name": "${message.author.tag}", "icon_url": "${message.author.displayAvatarURL()}"}}`);
        schematic.
            toImageBuffer()
            .then(buffer => fs.writeFileSync(`${fileName}`, buffer))
            .then(function () {
                const png = new Discord.MessageAttachment(`${fileName}`);
                const schematicFile = new Discord.MessageAttachment(`${schematicFileName}`);
                const anotherEmbed = {
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                    },
                    title: `**Name:** ${schematic.name}`,
                    description: `**Description:** ${schematic.description}`,
                    color: "#ADD8E6",
                    fields: [
                        { name: "Cost: ", value: `${cost}`, inline: true },
                        { name: "Power-Balance:  ", value: `${schematic.powerBalance}`, inline: true },
                    ],
                    image: {
                        url: 'attachment://' + schematic.name.replace(/[^a-zA-Z ]/g, "").split(" ").join("") + ".png",
                    },
                    timestamp: new Date(),
                }
                // send the final message
                channel = message.guild.channels.cache.get("865666058776739891")
                channel.send({ files: [png, schematicFileName], embed: anotherEmbed }).catch((error) => {
                    Errorembed = new Discord.MessageEmbed()
                        .setTitle(`An error has occurred\n${error}`)
                        .setColor("#ff0000")
                    message.channel.send(Errorembed)
                    console.error(error)
                    return
                })
                console.log("sent the embed")
                embed = new Discord.MessageEmbed()
                    .setTitle("Done")
                    .addField("Name: ", schematic.name)
                message.channel.send(embed)
            })
    } else {

    }
}

