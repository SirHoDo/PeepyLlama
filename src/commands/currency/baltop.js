function leaderboard(obj1, page) {
    
    obj = []
    obj1.forEach(user => {
        obj[obj.length] = user.data
    })
    const sorted = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse().slice((page * 10) - 10, page * 10)
    var leaderboard = ""
    sorted.forEach((entry, i) => {
        dk = api.numberWithCommas(entry.bal)
        if (i + (page - 1) * 10 + 1 == 1) {
            leaderboard = leaderboard + `🥇 **${entry.name}**- \`${dk}\` coins\n`
        } else if (i + (page - 1) * 10 + 1 == 2) {
            leaderboard = leaderboard + `🥈 ${entry.name}- \`${dk}\` coins\n`
        } else if (i + (page - 1) * 10 + 1 == 3) {
            leaderboard = leaderboard + `🥉 ${entry.name}- \`${dk}\` coins\n`
        } else {
            leaderboard = leaderboard + `#${i+(page-1)*10+1}: ${entry.name}- \`${dk}\` coins\n`
        }
    })
    return (leaderboard)
}
module.exports = {
    leaderboard: leaderboard,
    name: 'baltop',
    async execute(message, args) {

    }
}
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const linkRow = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setURL('https://peepy.info/user/')
        .setLabel('Leaderboard')
        .setStyle('LINK')
        )
        var all = await api.getAll()
        var pages = Math.ceil(Object.keys(all).length / 10)
        try {
            Number(args[0])
        } catch {
            var page = 1
        }
        if (Number.isInteger(Number(args[0]))) {
            if (Number(args[0]) > pages) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setTitle("Global Leaderboard")
                    .setDescription("Invalid page.\nThere are only " + pages + " pages.")
                    .setFooter(Object.keys(all).length + " user accounts")
                message.channel.send({embeds: [embed], components: [linkRow]})
                return
            } else {
                var page = Number(args[0])
            }
        } else {
            var page = 1
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#5d369d')
            .setTitle("Global Leaderboard")
            .setDescription(leaderboard(all, page))
            .setFooter(`Showing page ${page} of ${pages} pages\n${+Object.keys(all).length} user accounts`)
        message.channel.send({embeds: [embed], components: [linkRow]})



    }, {
        name: "baltop",
        aliases: ["rich", "richlb", "richest", "wealthy", "baltop"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} [pagenum]",
        description: "See the top richest users on >"
    }
)