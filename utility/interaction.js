module.exports = function replyEmbed(interaction, embed, client, files = undefined) {
    console.log("files: " + files)
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                embeds: [embed],
                // files: files,
            },
        },
    }).catch(console.error)
}