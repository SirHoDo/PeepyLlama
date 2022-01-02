const api = require("../../core/api")
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand")
const config = require("../../config.js")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        if (message.mentions.users.first()) {
            var id = message.mentions.users.first()

        } else {
            var id = message.author
        }
        var user = await api.getUser(id.id)
        const linkRow = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setURL(`https://peepy.info/user/${user.id}`)
        .setLabel(`${user.name}'s Profile`)
        .setStyle('LINK')
        )
        if (!user.hasOwnProperty("levels")) {
            user.levels = {
                xp: 0,
                level: 0
            }

        }
        var obj1 = await api.getAll()
        obj = []
        obj1.forEach(user => {
            obj[obj.length] = user.data
        })
        const sortedxp = Object.values(obj).sort((a, b) => (!a.levels ? 0 : a.levels.xp) - (!b.levels ? 0 : b.levels.xp)).reverse()
        var ranknumxp = sortedxp.findIndex(user => user.id == id.id) + 1

        const sortedrich = Object.values(obj).sort((a, b) => a.bal - b.bal).reverse()
        var ranknumrich = sortedrich.findIndex(user => user.id == id.id) + 1

        const embed = new Discord.MessageEmbed()
            .setColor('#5d369d') 
            .setTitle(`${user.name}'s stats!`)
            .setFooter(`Gain more XP by talking more\nGain more coins by using Peepy bot!`)
            .setDescription([
                (`**Global Money**\nCoins: \`${user.bal}\``),
                (`Rank: #${ranknumrich}\n`),
                (`**Global Active**\nXP: \`${user.levels.xp}\``),
                (`Level: \`${user.levels.level}\``),
                (`Rank: #${ranknumxp}`),
            ].join('\n'));
            if(user.staff) {
                embed.addField(`Peepy Llama Staff`, `\`\`\`${user.name} Is A Peepy Llama Admin!\`\`\``);
            }

            embed.addField("Profile", config.websiteURL + "user/" + id)
        message.channel.send({embeds: [embed], components: [linkRow]})



    }, {
        name: "rank",
        aliases: ["rank", "stats", "level", "lvl"],
        cooldown: 0,
        cooldownMessage: "",
        perms: [],
        description: "View your or another users rank in >",
        usage: "{prefix}{command} [@user]"
    }
)