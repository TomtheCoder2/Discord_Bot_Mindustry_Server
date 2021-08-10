module.exports = {
    name: 'message',
    execute(message) {
        console.log(`\n${message.author.tag} in #${message.channel.name} sent: ${message.content} (debug: ${message.debug}, ${message.channel.id})`);
    },
};