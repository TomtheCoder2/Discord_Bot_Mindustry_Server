const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args, Discord) {
        const data = new Discord.MessageEmbed().setTitle("Help").setColor("#8D8D8D")
        const { commands } = message.client;

        if (!args.length) {
            // data.push('Here\'s a list of all my commands:');
            // data.push(commands.map(command => command.name).join(', '));
            // data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username)
                .setTitle("**Help**")
                // .setDescription("These are all help commands:")
                .setColor("#8D8D8D")
                .addField("**These are all commands:**", "**" + commands.map(function (command) {
                    console.log()
                    if (command.name.substr(command.name.length - 12) != "_interaction") {
                        return command.name + "\n";
                    } else {
                        return
                    }
                }).join("") + "**")
                .addField("Specific help", `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
            // .addField("ID", message.author.id)
            // .addField("Creación", message.author.createdAt);

            message.channel.send(embed);

            return;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.addField(`**Name:**`, `${command.name}`)

        if (command.aliases) data.addField(`**Aliases:**`, `${command.aliases.join(', ')}`);
        if (command.description) data.addField(`**Description:**`, `${command.description}`);
        if (command.usage) data.addField(`**Usage:**`, "`" + `${prefix}${command.name} ${command.usage}` + "`");
        if (command.note) data.addField(`**Note:**`, `${command.note}`);
        if (command.footer) data.setFooter(`${command.footer}`);

        data.addField(`**Cooldown:**`, `${command.cooldown || 0} second(s)`);

        message.channel.send(data);
    },
};
