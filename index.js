const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token, prefix_unofficial, application_ID, public_Key } = require("./config.json");
const previewSchematic = require("./utility/previewSchematic");
const updateSlashCommands = require('./utility/updateSlashCommands')
const replyEmbed = require("./utility/interaction")
download = require("download")
const { DiscordInteractions } = require("slash-commands");
const interaction = new DiscordInteractions({
    applicationId: application_ID,
    authToken: token,
    publicKey: public_Key,
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const client = new Discord.Client();
const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// interactionCommands = []

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

commandFolders = fs.readdirSync("./normal_commands/");

for (const folder of commandFolders) {
    commandFiles = fs
        .readdirSync(`./normal_commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (file of commandFiles) {
        const commandFunction = require(`./normal_commands/${folder}/${file}`);
        console.log(commandFunction.name);
        client.commands.set(commandFunction.name, commandFunction);
        const command = {
            name: commandFunction.name,
            description: commandFunction.description,
            // options: [
            //     {
            //         name: "big",
            //         description: "should the image be big",
            //         // type: ApplicationCommandOptionType.BOOLEAN,
            //     },
            // ],
        };
        // console.log(command);
        // Create Global Command
        // interaction
        //     .createApplicationCommand(command)
        //     .then(console.log("infos:"))
        //     .then(console.log)
        //     .catch(console.error);
    }
}
commandFolders = fs.readdirSync("./interaction_commands/");
// console.log(client)
for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./interaction_commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const commandFunction = require(`./interaction_commands/${folder}/${file}`);
        // console.log(commandFunction.name);
        client.commands.set(commandFunction.name, commandFunction);
        if (commandFunction.options) {
            console.log(client.api.applications(application_ID).guilds("861522903522607124").commands.post({
                data: {
                    name: commandFunction.name.slice(0, commandFunction.name.length - 12),
                    description: commandFunction.description,
                    options: commandFunction.options,
                    // possible options here e.g. options: [{...}]
                }
            })
                // .then(console.log)
            )
        }
        // console.log(command)
    }
}
// testing
// const command = {
//     name: "ping",
//     description: "pong!",
// };

// // Create Global Command
// interaction
//     .createApplicationCommand(command, "861522903522607124")
//     .then(console.log)
//     .catch(console.error);
list = interaction
    .getApplicationCommands("861522903522607124")
    .then(console.log)
    .catch(console.error);
// console.log(list)
// interaction
//     .deleteApplicationCommand("868546090968973342", "861522903522607124")
//     .then(console.log)
//     .catch(console.error);

client.once("ready", () => {
    client.api.applications(client.user.id).guilds("861522903522607124").commands.post({
        data: {
            name: "hello",
            description: "hello world command"
            // possible options here e.g. options: [{...}]
        }
    });
    for (command in client.commands) {
        client.api.applications(client.user.id).guilds("861522903522607124").commands.post({
            data: {
                name: client.command.name,
                description: client.command.description,
                options: client.command.options,
                // possible options here e.g. options: [{...}]
            }
        });
        console.log(command)
    }
});
client.ws.on('INTERACTION_CREATE', async interaction => {
    commandName = interaction.data.name + "_interaction";
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    // console.log(client.commands)
    // console.log(commandName, command)
    try {
        command.execute(interaction, client, list);
    } catch (error) {
        console.error(error);
        Errorembed = new Discord.MessageEmbed()
            .setTitle(`An error has occurred\n${error}`)
            .setColor("#ff0000")
        // message.channel.send(Errorembed)
        // console.error(error)
        replyEmbed(interaction, Errorembed, client)
        // message.channel.send(error);
    };
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: "hello world!!!"
            }
        }
    })
})


// 864903369188180048

// client.api.applications(client.user.id).guilds('guild id').commands.post({
//     data: {
//         name: 'ping',
//         description: 'ping pong!'
//     }
// })
// client.on('messageCreate', async message => {
//     console.log("messageCreate")
//     if (!client.application?.owner) await client.application?.fetch();
//
//     if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
//         const data = {
//             name: 'ping',
//             description: 'Replies with Pong!',
//         };
//
//         const command = await client.application?.commands.create(data);
//         console.log(command);
//     }
// });

client.on("message", (message) => {
        var server = message.guild.id;
        console.log(server)
        // prefix = prefixJSON.split(" ")[0]
        if ((!message.content.startsWith(prefix) && !message.content.startsWith(prefix_unofficial) && !message.attachments.first()) || message.author.bot) return;
        if (message.channel.id !== "864922006565552148" && message.channel.id !== "864879809884586054" && message.channel.id !== "864903369188180048" && message.channel.id !== "720262538910105620") {
            if (message.attachments.first()) {
                return;
            }
            const msg = new Discord.MessageEmbed().setColor("#ff0000")
                .addField("**Wrong chat!**", "Please send your bot commands in the <#864879809884586054> chat")
        message.channel.send(msg);
        return;
    }
    if (message.attachments.first()) {//checks if an attachment is sent
        console.log(message.attachments.first().url.substr(message.attachments.first().url.length - 4))
        if (message.attachments.first().url.substr(message.attachments.first().url.length - 4) == "msch") {
            download(message.attachments.first().url, "./commands/mindustry/schematics/schematicFiles/").then(function () {
                inputbase64 = fs.readFileSync("./commands/mindustry/schematics/schematicFiles/" + message.attachments.first().name, { encoding: 'base64' })
                previewSchematic(message, inputbase64, Discord, client)
            })
        }
        return
        // if (msg.attachments.first().filename === `msch`) {//Download only png (customize this)
        //     download(msg.attachments.first().url);//Function I will show later
        // }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;

    if (command.guildOnly && message.channel.type === "dm") {
        return message.reply("I can't execute that command inside DMs!");
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply("You can not do this!");
        }
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    };

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
        if (!message.member.roles.cache.has('861523420076179457')) {
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(
                    `please wait ${timeLeft.toFixed(
                        1
                    )} more second(s) before reusing the \`${command.name
                    }\` command.`
                );
            };
        };
    };

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, Discord, client, rl);
    } catch (error) {
        console.error(error);
        // error_string = "`" + error + "`";
        // ; let embed = new Discord.MessageEmbed().setTitle(`Oh no\nThere was an error trying to execute that command!`).setField("**The Error:**", `${error_string}`).setColor("#ff0000");
        // message.channel.send(embed);
        message.channel.send("There was an error trying to execute that command!");
        // embed = {"title": ""}
        // const embed = new Discord.MessageEmbed()
        //     .setTitle(`Oh no\nThere was an error trying to execute that command!`)
        //     .setField("**The Error:**", `${error}`)
        //     .setColor("#ff0000")
        // .addField("Usuario", '${message.author.username}#${message.author.discriminator}')
        // .addField("ID", message.author.id)
        // .addField("Creación", message.author.createdAt);
        message.channel.send(error);
    };
},
);

client.login(token);
