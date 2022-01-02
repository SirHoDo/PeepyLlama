const Discord = require("discord.js")
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")


module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const linkRow = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setURL('https://peepy.info/user/')
        .setLabel('Leaderboard')
        .setStyle('LINK')
        )
        const embed = new Discord.MessageEmbed()
        .setColor('#5d369d')
            .setTitle("Leaderboard")
            .setDescription("There are 2 types of leaderboards in Peepy bot!\n\n`>baltop` - View the top richest Peepy users!\n`>active` - View the most active Peepy users!")
        message.channel.send({embeds: [embed], components: [linkRow]})


    }, {
        name: "leaderboard",
        aliases: ["lb", "leaderboard", "top"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "shows the list of available leaderboards!"
    }
)