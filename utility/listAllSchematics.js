module.exports = function previewSchematic(message, Discord, client) {
    fs = require('fs');
    const util = require('util')
    const { Schematic } = require("mindustry-schematic-parser");
    const schematicFiles = fs
        .readdirSync(`./data/schematics/schematicNames/`)
        .filter((file) => file.endsWith(".json"));
    schematicNames = []
    for (const file of schematicFiles) {
        // const schematic = require(`./commands/mindustry/schematics/schematicData/${file}`);
        schematicName = fs.readFileSync(`./data/schematics/schematicNames/${file}`);
        schematicName = JSON.parse(schematicName);
        // console.log(schem)
        // const schematic = Schematic.decode(schem.base64);
        // console.log(schematicName.name);
        schematicNames.push(schematicName.name)
        // client.commands.set(command.name, command);
    }
    stringNames = '';
    // console.log(stringNames)
    embed = {
        title: "These are all schematics:",
        color: "#ADD8E6"
    }
    // console.log(embed)
    // message.channel.send({ embed: embed });
    for (i = 0; i < schematicNames.length; i++) {
        if (stringNames.length + schematicNames[i + 1] > 1024) {
            console.log("split")
            embed.description = stringNames
            stringNames = ''
            message.channel.send({ embed: embed });
            embed = {
                color: "#ADD8E6"
            }
        }
        stringNames += schematicNames[i] + "\n"
    }
    // console.log(stringNames)
    embed.description = stringNames
    // console.log(embed)
    message.channel.send({ embed: embed });

}
