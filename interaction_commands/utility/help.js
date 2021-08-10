const { prefix } = require('../../config.json');
const replyEmbed = require('../../utility/interaction')
const Discord = require("discord.js");

module.exports = {
    name: 'help_interaction',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    options: [
        {
            name: 'command',
            type: '3',
            description: 'get help for a specific command',
            required: false,
        }
    ],
    cooldown: 5,
    execute(interaction, client, list = undefined) {
        console.log(list)
        const { Cname, options } = interaction.data
        const args = {}
        if (options) {
            for (const option of options) {
                const { name, value } = option
                args[name] = value
            }
        }
        console.log(args)
        input = args["command"]
        const data = new Discord.MessageEmbed().setTitle("Help").setColor("#8D8D8D")
        const { commands } = client;
        console.log(input)

        if (!input) {
            // data.push('Here\'s a list of all my commands:');
            // data.push(commands.map(command => command.name).join(', '));
            // data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            const embed = new Discord.MessageEmbed()
                // .setAuthor(message.author.username)
                .setTitle("**Help**")
                // .setDescription("These are all help commands:")
                .setColor("#8D8D8D")
                .addField("**These are all commands:**", "**" + commands.map(function (command) {
                    console.log()
                    if (command.name.substr(command.name.length - 12) == "_interaction") {
                        return command.name.slice(0, command.name.length - 12) + "\n";
                    } else {
                        return
                    }
                }).join("") + "**")
                .addField("Specific help", `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);

            replyEmbed(interaction, embed, client)

            return;
        }

        const name = input
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            errorEmbed = {
                "title": "that\'s not a valid command!",
                "color": "#ff0000"
            }
            return replyEmbed(interaction, errorEmbed, client)
        }

        data.addField(`**Name:**`, `${command.name}`)

        if (command.aliases) data.addField(`**Aliases:**`, `${command.aliases.join(', ')}`);
        if (command.description) data.addField(`**Description:**`, `${command.description}`);
        if (command.usage) data.addField(`**Usage:**`, `${prefix}${command.name} ${command.usage}`);
        if (command.note) data.addField(`**Note:**`, `${command.note}`);

        data.addField(`**Cooldown:**`, `${command.cooldown || 0} second(s)`);

        replyEmbed(interaction, data, client)
    },
};
