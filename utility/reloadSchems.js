module.exports = function previewSchematic(message, Discord) {
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
    fs = require('fs');
    const util = require('util')
    const { Schematic } = require("mindustry-schematic-parser");
    const schematicFiles = fs
        .readdirSync(`./data/schematics/schematics/schematicData/`)
        .filter((file) => file.endsWith(".json"));
    schematicNames = []
    for (const file of schematicFiles) {
        // const schematic = require(`./data/schematics/schematics/schematicData/${file}`);
        schematicName = fs.readFileSync(`./data/schematics/schematics/schematicData/${file}`);
        schematicName = JSON.parse(schematicName);
        // console.log(schem)
        const schematic = Schematic.decode(schematicName.base64);
        console.log(schematic.name)
        const schematicFileName = "./data/schematics/schematics/schematicFiles/" + schematic.name.split(" ").join("") + ".msch"
        fs.writeFileSync(schematicFileName, Buffer.from(schematic.base64, 'base64'))
        const fileName = "./data/schematics/schematics/schematicPNG/" + schematic.name.split(" ").join("") + ".png"
        let data = JSON.stringify(schematic);
        fs.writeFileSync("./data/schematics/schematics/schematicData/" + schematic.name.split(" ").join("") + ".json", data);
        fs.writeFileSync("./data/schematics/schematics/schematicNames/" + schematic.name.split(" ").join("") + ".json", `{"name":"${schematic.name}"}`);
        schematic.
            toImageBuffer()
            .then(buffer => fs.writeFileSync(`${fileName}`, buffer))
    }
    console.log("finished")
    embed = {
        title: "Reloaded all Schematics!",
        color: "#ff0000"
    }
    message.channel.send({ embed: embed });

}
