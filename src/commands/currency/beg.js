const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        await addCD()
        if (Math.floor(Math.random() * 10) + 1 == 10) {
            var moneyEarned = 1000
        } else {
            var moneyEarned = Math.floor(Math.random() * 100) + 1
        }

        var user = await api.changeBal(message.author.id, moneyEarned)
        const embed = new Discord.MessageEmbed()
            .setColor('#5d369d')
            .setTitle("Beg Results for " + user.name)
            .setDescription("You gained `" + moneyEarned + "` coins!\nYou now have a total of `" + user.bal + "`coins!")
        message.channel.send({embeds: [embed]})

    }, {
        name: "beg",
        aliases: ["beg"],
        cooldown: 10000,
        cooldownMessage: "Dont be greedy!\nYou can beg again in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "Beg for some dollars!"

    }
)