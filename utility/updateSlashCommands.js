r = require('request');

module.exports = function updateSlashCommands(my_application_id) {
    const { SlashCreator } = require('slash-create');
    const path = require('path');
    const creator = new SlashCreator({
        applicationID: '864875680716816404',
        publicKey: '998a2e1063acd71d906459ef72b0fe206aecdb63787db4198a1d5e8b3d11ada6',
        token: 'ODY0ODc1NjgwNzE2ODE2NDA0.YO70Pg.XoPr5EIRXQZL6cea9OQkyORAC7Y',
    });

    creator
        // Registers all of your commands in the ./commands/ directory
        .registerCommandsIn(path.join(__dirname, '../commands/fun'))
        // This will sync commands to Discord, it must be called after commands are loaded.
        // This also returns itself for more chaining capabilities.
        .syncCommands();
}