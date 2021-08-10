module.exports = {
    name: 'input_interaction',
    discription: 'input something in the console',
    execute(message, args, Discord, client, rl) {
        rl.question('What do you think of Node.js? ', (answer) => {
            // TODO: Log the answer in a database
            console.log(`Thank you for your valuable feedback: ${answer}`);
            message.channel.send(answer);
            rl.close();
        });
    }
}