const listAllSchematics = require("../../utility/listAllSchematics");
const previewSchematic = require("../../utility/previewSchematic");
const reloadSchems = require("../../utility/reloadSchems");
const viewSchematic = require("../../utility/viewSchematic");
const download = require("download")
const fs = require("fs")


module.exports = {
    name: 'schematic',
    description: 'preview schematic',
    cooldown: 0,
    aliases: ['schem', 'schm'],
    usage: "<base64 code of the schematic> or file",
    description: "preview schematic and post it in <#865666058776739891>",
    note: "If the base64 Code is larger than 2000 characters, please upload the .schm file of your schematic. Else the bot will give an error. Thanks.\n\nWith `/schematic list ` you can list all previously uploaded schematics.\nWith `/schematic view <name of a schematic> `  you can preview a schematic from the list.",
    // footer: "",
    execute(message, args, Discord, client) {
        console.log(message.attachments.first())
        if (message.attachments.first()) {//checks if an attachment is sent
            console.log(message.attachments.first().url.substr(message.attachments.first().url.length - 4))
            if (message.attachments.first().url.substr(message.attachments.first().url.length - 4) == "msch") {
                download(message.attachments.first().url, "./uploadedSchems/")
                inputbase64 = fs.readFileSync("./uploadedSchems/" + message.attachments.first().name, { encoding: 'base64' })
                previewSchematic(message, inputbase64, Discord, client)
            }
            return
            // if (msg.attachments.first().filename === `msch`) {//Download only png (customize this)
            //     download(msg.attachments.first().url);//Function I will show later
            // }
        }
        inputbase64 = 'bXNjaAF4nE2N227CMAyGf9KjhrRpSNznBXqFtBfhCUJjUBEklUkH7NG5oDhppWHH+Rwf/iBDqZA7cyZ8b24/emuc1cHrbcumx9LSpeWuD513WL899MFrvWOxGh/9cPol7v6IJfdX4sZ5S/jqnJQD2ebiBYzPwVni/clfm4MJhPo4uDZJl/NEyX6IrHYmCO8AVvi3RTpQdQWMT6hxlBBKVYlLZ3zMo9mEHKleFDHN0vYiQjxPW6koUQjyNFVKVsSOmiSiOqr5A7myCUlZzcovD0488Q==';
        if (args[0]) {
            if (args[0].slice(0, 5) == "bXNja") {
                inputbase64 = args[0]
                previewSchematic(message, inputbase64, Discord, client)
            } else if (args[0] == "list") {
                listAllSchematics(message, Discord, client)
            } else if (args[0] == "reload") {
                reloadSchems(message, Discord)
            } else if (args[0] == "view") {
                args.shift()
                schemName = args.join("")
                console.log(schemName)
                viewSchematic(message, schemName, Discord, client)
            } else {
                schemName = args.join("")
                console.log(schemName)
                viewSchematic(message, schemName, Discord, client)
            }
        }
        return
    },
};