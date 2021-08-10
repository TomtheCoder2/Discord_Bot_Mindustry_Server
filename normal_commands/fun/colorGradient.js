const Gradient = require("javascript-color-gradient")
const chalk = require('chalk');
const log = console.log;
const colorGradient = new Gradient();
module.exports = {
    name: 'color_gradient',
    description: 'generate a color gradient from different colors',
    aliases: ['cg'],
    usage: '<first color> <second color>',
    // note: "Example: `/ud to this is a Test`\nor `;ud from thubis ubis uba Tubest`\n\nIf you want more Infos go to the [wikipedia article](<https://en.wikipedia.org/wiki/Ubbi_dubbi>).",
    // footer: "not at all just copied from wikipedia",
    // footer: 'If you want more Infos go to the [wikipedia article](<https://en.wikipedia.org/wiki/Ubbi_dubbi>).',
    execute(message, args, Discord) {
        const color1 = args[0]
        const color2 = args[1]
        args.shift()
        args.shift()
        const text = args.join(' ')
        console.log(text)

        colorGradient.setMidpoint(text.length);
        colorGradient.setGradient(color1, color2);
        // console.log(colorGradient.getArray());
        colorArray = colorGradient.getArray()
        // console.log(colorArray)
        // log(chalk.hex('#DEADED').bold('Bold gray!'));
        result = ''
        for (i in colorArray) {
            // console.log(colorArray[i])
            log(chalk.hex(colorArray[i]).bold(`${colorArray[i]}    ${text[i]}`));
            result += `[${colorArray[i]}]${text[i]}`
        }
        // message.channel.send(result)
        embed = new Discord.MessageEmbed()
            .setTitle(`This is the color gradient for ${color1} to ${color2}:`)
            .setDescription(`${result}`)
            .setColor(`${color1}`)
        message.channel.send(embed)
    }
}