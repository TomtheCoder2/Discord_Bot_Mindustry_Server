const listAllSchematics = require("../../utility/listAllSchematics");
const previewSchematic = require("../../utility/previewSchematic");
const reloadSchems = require("../../utility/reloadSchems");
const viewSchematic = require("../../utility/viewSchematic");
const Discord = require('discord.js')
const download = require("download")
const fs = require("fs")


module.exports = {
    name: 'schematic_interaction',
    description: 'preview schematic',
    cooldown: 0,
    aliases: ['schem', 'schm'],
    usage: "<base64 code of the schematic> or file",
    description: "preview schematic and post it in #schematics",
    note: "If the base64 Code is larger than 2000 characters, please upload the .schm file of your schematic. Else the bot will give an error. Thanks.\n\nWith `/schematic list ` you can list all previously uploaded schematics.\nWith `/schematic view <name of a schematic> `  you can preview a schematic from the list.",
    options: [
        {
            name: 'input',
            type: '3',
            description: 'upload a schematic (enter the base64 code) or view (enter the name) one',
            required: false,
        }
    ],
    // footer: "",
    execute(interaction, client) {
        inputbase64 = 'bXNjaAF4nE2N227CMAyGf9KjhrRpSNznBXqFtBfhCUJjUBEklUkH7NG5oDhppWHH+Rwf/iBDqZA7cyZ8b24/emuc1cHrbcumx9LSpeWuD513WL899MFrvWOxGh/9cPol7v6IJfdX4sZ5S/jqnJQD2ebiBYzPwVni/clfm4MJhPo4uDZJl/NEyX6IrHYmCO8AVvi3RTpQdQWMT6hxlBBKVYlLZ3zMo9mEHKleFDHN0vYiQjxPW6koUQjyNFVKVsSOmiSiOqr5A7myCUlZzcovD0488Q==';
        const { name, options } = interaction.data
        const args = {}
        if (options) {
            for (const option of options) {
                const { name, value } = option
                args[name] = value
            }
        }
        console.log(args)
        input = args["input"]
        console.log(input)
        if (args["input"]) {
            if (args["input"].slice(0, 5) == "bXNja") {
                inputbase64 = args["input"]
                previewSchematic(message, inputbase64, Discord, client)
            } else if (args["input"] == "list") {
                listAllSchematics(message, Discord, client)
            } else if (args["input"] == "reload") {
                reloadSchems(message, Discord)
            } else if (args["input"] == "view") {
                // input.shift()
                schemName = input.replace(/[^a-zA-Z ]/g, "").split(" ").join("")
                console.log(schemName)
                viewSchematic(null, schemName, Discord, client)
            } else {
                schemName = input.replace(/[^a-zA-Z ]/g, "").split(" ").join("")
                console.log(schemName)
                viewSchematic(null, schemName, Discord, client, interaction)
            }
        }
        return
    },
};