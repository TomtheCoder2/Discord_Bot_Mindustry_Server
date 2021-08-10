module.exports = function sendEmbed(channel, embed, files = undefined, content = undefined) {
    return channel.send({ embed: embed, files, content });
}

