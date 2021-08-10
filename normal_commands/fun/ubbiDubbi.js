function toUbbi(text_) {
    i = 0
    while (i < text_.length) {
        if (test(text_, i)) {
            var tex = [text_.slice(0, i), "ub", text_.slice(i)].join('');
            //tex=text_[:i]+"ub"+text_[i:]
            text_ = tex
            //print(text_, text_[i] ,i)
            i += 2
        }
        //print(text_[i], i)
        i += 1

    }
    console.log(text_)
    return text_
}
function fromUbbi(text_) {
    // var text_ = document.getElementById("text_").value;
    i = text_.length - 1
    while (i > -1) {
        k = Math.min(i + 1, text_.length - 1)
        if (text_[i] == "u" && text_[k] == "b") {
            //tex=text[:i]+text[k+1:]
            var tex = [text_.slice(0, i), "", text_.slice(k + 1)].join('');
            text_ = tex
        }
        if (text_[i] == "U" && text_[k] == "B") {
            //tex=text[:i]+text[k+1:]
            var tex = [text_.slice(0, i), "", text_.slice(k + 1)].join('');
            text_ = tex
        }
        if (text_[i] == "U" && text_[k] == "b") {
            //tex=text[:i]+text[k+1:]
            var tex = [text_.slice(0, i), "", text_.slice(k + 1)].join('');
            text_ = tex
        }
        i -= 1
    }
    return text_
    // document.getElementById("result").innerHTML = text_;
}
function test(text_, i) {
    if (text_[i] == "a" | text_[i] == "e" | text_[i] == "i" | text_[i] == "o" | text_[i] == "u") {
        return true
    }
    if (text_[i] == "A" | text_[i] == "E" | text_[i] == "I" | text_[i] == "O" | text_[i] == "U") {
        return true
    } else {
        return false
    }
}
module.exports = {
    name: 'Ubbi_Dubbi',
    description: 'Translate a text to Ubbi Dubbi!',
    aliases: ['ud'],
    usage: '<from || to> <text>',
    note: "Example: `/ud to this is a Test`\nor `;ud from thubis ubis uba Tubest`\n\nIf you want more Infos go to the [wikipedia article](<https://en.wikipedia.org/wiki/Ubbi_dubbi>).",
    // footer: "not at all just copied from wikipedia",
    // footer: 'If you want more Infos go to the [wikipedia article](<https://en.wikipedia.org/wiki/Ubbi_dubbi>).',
    execute(message, args, Discord) {
        if (args[0] == "to") {
            args.shift();
            const text = args.join(' ')
            translated_text = toUbbi(text)
            console.log(translated_text)
            embed = new Discord.MessageEmbed()
                .addField(`**Traslated "${text}":**`, `${translated_text}`)
                .setColor("#f0fa43")
            message.channel.send(embed).catch((error) => {
                Errorembed = new Discord.MessageEmbed()
                    .setDescription(`An error has occurred\n${error}`)
                    .setColor("#ff0000")
                message.channel.send(Errorembed).catch((error) => {
                    Errorembed = new Discord.MessageEmbed()
                        .setDescription(`An error has occurred\n${error}`)
                        .setColor("#ff0000")
                    message.channel.send(Errorembed)
                    console.error(error)
                    return
                })
                console.error(error)
                return
            })
        } else if (args[0] == "from") {
            args.shift();
            const text = args.join(' ')
            translated_text = fromUbbi(text)
            console.log(translated_text)
            embed = new Discord.MessageEmbed()
                .addField(`**Traslated "${text}":**`, `${translated_text}`)
                .setColor("#f0fa43")
            message.channel.send(embed).catch((error) => {
                Errorembed = new Discord.MessageEmbed()
                    .setDescription(`An error has occurred\n${error}`)
                    .setColor("#ff0000")
                message.channel.send(Errorembed).catch((error) => {
                    Errorembed = new Discord.MessageEmbed()
                        .setDescription(`An error has occurred\n${error}`)
                        .setColor("#ff0000")
                    message.channel.send(Errorembed)
                    console.error(error)
                    return
                })
                console.error(error)
                return
            })
        }
    }
}