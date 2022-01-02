const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const config = require("../../config.js")
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        
        if (message.mentions.users.first()) {
            var id = message.mentions.users.first()

        } else {
            var id = message.author
        }
        api.getUser(id.id)
            .then((user) => {
                const linkRow = new Discord.MessageActionRow()
                .addComponents(
                new Discord.MessageButton()
                .setURL(`https://peepy.info/user/${user.id}`)
                .setLabel(`${user.name}'s Profile`)
                .setStyle('LINK')
                )
                x = true

                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setTitle(user.name + "'s Balance")
                    .setDescription('Balance: `' + api.numberWithCommas(user.bal) + "` coins!")
                    .addField("Profile", config.websiteURL + "user/" + id)
                message.channel.send({embeds: [embed], components: [linkRow]})
            })
            .catch((err) => {
                console.log(err)
                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setTitle("They don't have an account!")
                message.channel.send({embeds: [embed]})
            })


    }, {
        name: "balance",
        aliases: ["bal", "balance", "coins", "coin", "amount", "wallet"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        description: "View how much Peepy Llama coins you or someone else has!\nShows the balance of [@user], if no user pinged, it will show your balance.",
        usage: "{prefix}{cmd} [@user]"
    }
)