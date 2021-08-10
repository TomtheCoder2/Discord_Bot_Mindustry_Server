const replyEmbed = require('../../utility/interaction')
const Discord = require("discord.js");
module.exports = {
    name: 'ping_interaction',
    description: 'Ping!',
    cooldown: 5,
    execute(interaction, client) {
        embed = new Discord.MessageEmbed()
            .setTitle(`Pong!`)
            .setColor("#00ffff")
        replyEmbed(interaction, embed, client)
    },
};
