const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require('discord.js')

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)
        var message23 = {
            content: args[0]
        }
        if (isNaN(message23.content) || !Number.isInteger(Number(message23.content)) || Number(message23.content) < 1 || Number(message23.content) > user.bal) {
            ask(user, message)
        } else {
            var money = Number(message23.content)
            user.bal = user.bal - money

            api.modUser(message.author.id, user)
                .then(async() => {
                    await addCD()
                    doubleornothing(money, 0, message)
                })



            .catch(() => {
                message.channel.send("An error occured")
            })
        }


    }, {
        name: "doubleornothing",
        aliases: ["don"],
        cooldown: 1800000,
        cooldownMessage: "You just played Double Or Nothing!\nYou can play again in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} [moneyToDouble]",
        description: "Double your money, or get nothing at all."
    }
)

function randomBoolean() {
    return Math.random() <= 0.5;
}

function doubleornothing(money, streak, message) {
    api.getUser(message.author.id)
        .then((user) => {


            var double = randomBoolean()
            const embed = new Discord.MessageEmbed()
            .setColor('#5d369d')
                .setTitle("Will your money double?")
            message.channel.send({embeds: [embed]})
                .then((msggg) => {
                    setTimeout(() => {
                        const embed11 = new Discord.MessageEmbed()
                        .setColor('#5d369d')
                            .setTitle("Or will it vanish?")
                        msggg.edit(embed11)
                            .then((lol) => {
                                setTimeout(() => {
                                    lol.delete()
                                    if (double) {
                                        const embed = new Discord.MessageEmbed()
                                        .setColor('#5d369d')
                                            .setAuthor(user.name, message.author.avatarURL())
                                            .setTitle("It's double BABY!")
                                            .setDescription(`Your original ${money} has now doubled to ${money*2}!!!\nClaim it nor or take a %50 chance to double it AGAIN!!!\n\n\n\`take\` - Take this money and run\n\`double\` - Try to double again! (%50 chance)`)
                                            .setFooter("Respond with an above option\nYou have 1 minute to respond.")
                                        message.channel.send({embeds: [embed]})
                                        const filter = m => m.author.id === message.author.id;
                                        const collector = message.channel.createMessageCollector({ filter, time: 60000 })
                                        var collected = false
                                        collector.on("collect", (message23) => {
                                            var text = message23.content.toLowerCase().trim()
                                            if (text == "keep" || text == "take") {
                                                collected = true
                                                collector.stop()
                                                api.changeBal(message.author.id, money * 2)
                                                    .then(() => {
                                                        const embed1111 = new Discord.MessageEmbed()
                                                        .setColor('#5d369d')
                                                            .setAuthor(user.name, message.author.avatarURL())
                                                            .setTitle("Money withdrawn!")
                                                            .setDescription(`You gained ${money*2} coins!!\nYour money was doubled ${streak+1} times`)
                                                            .setFooter(`"Easy money!" - ${user.name}`)
                                                        message.channel.send({embeds: [embed1111]})

                                                    })
                                                    .catch(() => {
                                                        message.channel.send("err0r")
                                                    })
                                            } else if (text == "double" || text == "duble" || text == "again") {
                                                collected = true
                                                collector.stop()

                                                doubleornothing(money * 2, streak + 1, message)
                                            } else {
                                                message.channel.send("**Invalid option**\nMake sure to type `take` or `double`\nYou can type it again")
                                            }
                                        })

                                        collector.on("end", () => {
                                            if (!collected) {

                                                api.changeBal(message.author.id, money * 2)
                                                    .then(() => {
                                                        message.channel.send("**1 minute has passed**\nYour money has been withdrawn automatically due to inactivity..")
                                                    })
                                                    .catch(() => {
                                                        message.channel.send("err")
                                                    })

                                            }
                                        })
                                    } else {
                                        const embed = new Discord.MessageEmbed()
                                        .setColor('#5d369d')
                                            .setAuthor(user.name, message.author.avatarURL())
                                            .setTitle("Lol, didn't your mother tell you not to make bets?")
                                            .setDescription(`Lol too bad.\nYou lost ${money} coins with a streak of ${streak}...`)
                                            .setFooter("Better luck next time..")
                                        message.channel.send({embeds: [embed]})
                                        if (!user.hasOwnProperty("trophy")) {
                                            user.trophy = {}
                                        }
                                        user.trophy["c4loss"] = {
                                            type: "Game",
                                            name: "Big L",
                                            rewarded: new Date().toLocaleDateString(),
                                            href: "/trophy"
                    
                                        }
                                        api.modUser(message.author.id, user)
                                    }
                                }, 1000)
                            })
                    }, 1000)
                })
        })
        .catch(() => {
            message.channel.send("Database error")
        })
}

function ask(user, message) {
    const embed = new Discord.MessageEmbed()
        .setAuthor(user.name, message.author.avatarURL())
        .setColor('#5d369d')
        .setTitle("Double or Nothing")
        .setDescription("How much are you putting on the line?\nDouble your coins, or lose it all.")
        .setFooter("Respond with a number from 0 - " + user.bal + "\nPlease respond within 20 seconds")
    message.channel.send({embeds: [embed]})
    const filter = m => m.author.id === message.author.id;
            const collector67 = message.channel.createMessageCollector({ filter, max: 1, time: 20000 })
    collector67.on("collect", (message23) => {
        if (isNaN(message23.content)) return message23.channel.send("That is an invalid number, try running the command again")
        if (!Number.isInteger(Number(message23.content))) return message23.channel.send("That is not an integer, try running the command again")
        if (Number(message23.content) < 1) return message23.channel.send("The number has to be atleast 1, try running the command again")
        if (Number(message23.content) > user.bal) return message23.channel.send(`You don't have \`${message23.content}\` coins!\nYou only have \`${user.bal}\` coins!`)

        var money = Number(message23.content)
        user.bal = user.bal - money

        api.modUser(message.author.id, user)
            .then(() => {

                api.addCool(message.author.id, "doubleornothing", 1800000)
                    .then(() => {
                        doubleornothing(money, 0, message)
                    })

            })
            .catch(() => {
                message.channel.send("An error occured")
            })

    })
}