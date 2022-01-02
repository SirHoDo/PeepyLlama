const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const config = require("../../config.js")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

        if (message.mentions.users.first()) {
            var id = message.mentions.users.first()

        } else {
            var id = message.author
        }
        const linkRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL('https://peepy.info/commands/')
                .setLabel('Visit Profile')
                .setStyle('LINK')
        )
        const embed = new Discord.MessageEmbed()
        .setColor('#5d369d')
        .addField("Profile", config.websiteURL + "user/" + id)


        message.channel.send({embeds: [embed], components: [linkRow]});

    }, {
        name: "profile",
        aliases: ["profile"],
        cooldown: 0,
        cooldownMessage: "mmm",
        perms: ["SEND_MESSAGES"],
        description: "mmm"
    }
)