const api = require("../../core/api")
const Discord = require('discord.js')

const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)



        if (!user.hasOwnProperty("job")) {
            user.job = { exists: false }
        }

        if (user.job.exists) {
            const embed = new Discord.MessageEmbed()
                .setColor('#5d369d')
                .setTitle(`Resign confirmation`)
                .setDescription(`Are sure you want to resign from your job \`${user.job.name}\``)
                .setFooter("Respond with 'Y' or 'N'\nPlease respond within 20 seconds")
            message.channel.send({embeds: [embed]})
            const filter = m => m.author.id === message.author.id;
            const collector67 = message.channel.createMessageCollector({ max: 1, time: 20000 })
            collector67.on("collect", async(coolmesgae) => {
                if (coolmesgae.content.toLowerCase() == "yes" || coolmesgae.content.toLowerCase() == "y") {
                    var fhghfgh = user.job.name
                    user.job = { exists: false }
                    await api.modUser(message.author.id, user)
                    const embe45d = new Discord.MessageEmbed()
                    
                        .setColor('GREEN')
                        .setTitle(`Resigned from ${fhghfgh}`)

                    coolmesgae.channel.send(embe45d)

                    await addCD()

                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                        .setTitle(`Operation cancelled`)
                    message.channel.send({embeds: [embed]})
                }
            })
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle("You dont have a job!")
            message.channel.send({embeds: [embed]})
        }


    }, {
        name: "resign",
        aliases: ["resign"],
        cooldown: 43200000,
        cooldownMessage: "You just resigned your old job, you can resign again in `{timeleft}`",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd}",
        description: "Resign from your job"
    }
)