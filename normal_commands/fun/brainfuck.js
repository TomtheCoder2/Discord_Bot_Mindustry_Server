const Brainfuck = require('brainfuck-node');
const brainfuck_generator = require('C:/Users/janwi/Online_Mindustry_Community_bot/utility/brainfuck_generator')
options = {
    "maxSteps": "1000000"
}
const brainfuck = new Brainfuck(options);
const fs = require('fs')
code = fs.readFileSync('C:/Users/janwi/Online_Mindustry_Community_bot/normal_commands/examples/bf_example.json')
code = JSON.parse(code).code;
game = fs.readFileSync('C:/Users/janwi/Online_Mindustry_Community_bot/normal_commands/examples/lol.json')
game = JSON.parse(game).code;
module.exports = {
    name: 'brainfuck',
    description: 'Compile your brainfuck code!',
    aliases: ['bf'],
    note: "Run `/brainfuck example` to show an example code!",
    // footer: "not at all just copied from wikipedia",
    execute(message, args, Discord) {
        // result = brainfuck.execute('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.');
        if (args[0] == "example") {
            console.log(code)
            embed = new Discord.MessageEmbed()
                .setTitle("**Info and example:**")
                .setDescription(`An example and Info about the programing lanugage brainfuck:`)
                .setColor("#00a0ff")
                .addField("example code:", "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.")
                .addField("and the output:", "Hello World!")
                .addField('**"Documentation:"**', `">"  Increment the data pointer (to point to the next cell to the right).\n"<"   Decrement the data pointer (to point to the next cell to the left).\n"+"	Increment (increase by one) the byte at the data pointer.\n"-"	Decrement (decrease by one) the byte at the data pointer.\n"."	Output the byte at the data pointer.\n","	Accept one byte of input, storing its value in the byte at the data pointer.\n"["	If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.\n"]"	If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.`)
                .setFooter("not at all just copied from wikipedia")
            message.channel.send(embed);
            return
        } else if (args[0] == "lol") {
            try {
                // console.log(brainfuck.execute(game))
                embed = new Discord.MessageEmbed()
                    .addField("output", brainfuck.execute(game));
                message.channel.send(embed)
            } catch (err) {
                console.error(err)
                embed = new Discord.MessageEmbed()
                    .setTitle(`There was an error trying to execute that command!`)
                    .setDescription(`${err}`)
                    .setColor("#ff0000")
                message.channel.send(embed);
                return
            }
        } else if (args[0] == "generate" || args[0] == "gen") {
            args.shift();
            const text = args.join(' ')
            code = brainfuck_generator(text)
            final_code = ''

            embed = {
                title: `This is the text ("${text}") in brainfuck code:`,
                color: "#ADD8E6"
            }
            if (code.length > 2048) {
                embed = new Discord.MessageEmbed()
                    .setTitle(`There was an error trying to execute that command!`)
                    .setDescription(`the code is longer than 2048 characters!`)
                    .setColor("#ff0000")
                message.channel.send(embed);
                return
            }
            // console.log(embed)
            // message.channel.send({ embed: embed });
            for (i = 0; i < code.length; i++) {
                // console.log(code[i])
                if (i % 1023 == 0 && i != 0) {
                    console.log(i)
                    embed.description = final_code
                    message.channel.send({ embed: embed })
                    embed = {
                        color: "#ADD8E6"
                    }
                    final_code = ''
                }
                final_code += code[i]
            }
            // console.log(final_code)
            embed.description = final_code
            // console.log(embed)
            message.channel.send({ embed: embed });
            return
        }
        try {
            result = brainfuck.execute(args[0])
        } catch (err) {
            console.error(err)
            embed = new Discord.MessageEmbed()
                .setTitle(`There was an error trying to execute that command!`)
                .setDescription(`${err}`)
                .setColor("#ff0000")
            message.channel.send(embed);
            return
        }
        embed = new Discord.MessageEmbed()
            .setTitle("**Output of your brainfuck code:**")
            .setDescription(`${result.output}`)
            .setFooter("Run with --debug to get more information!")
        if (args[1] == "--debug") {
            embed.addField("Debug Information:", JSON.stringify(result, undefined, 2))
        }
        message.channel.send(embed).catch((error) => {
            Errorembed = new Discord.MessageEmbed()
                .setTitle(`An error has occurred\n${error}`)
                .setColor("#ff0000")
            message.channel.send(Errorembed)
            console.error(error)
            return
        })
        // console.log(JSON.stringify(result, undefined, 2));
        console.log(result.output)
        // obToString(result)
        console.log(brainfuck_generator("Test"))
        return
    },
};
