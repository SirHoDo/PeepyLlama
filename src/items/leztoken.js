const Discord = require('discord.js')
const api = require('../core/api')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {

    name: 'leztoken',
    use(message, userItem, user) {
        api.checkCool(message.author.id, "leztoken")
            .then((cooldown) => {
                if (cooldown.cooldown) {
                    const embed = new Discord.MessageEmbed()
                        .setColor('#5d369d')
                        .setTitle("Cooldown")
                        .setDescription("You only just sucked off <@828916456938012732>!\nReady for another round in `" + api.convertMS(cooldown.msleft) + "`")
                    message.channel.send({embeds: [embed]})
                } else {
                    if (user.inv.hasOwnProperty('laptop')) {
                        laptopAmount = user.inv['laptop'].amount
                        currentBal = user.bal
                    } else {
                        laptopAmount = 0;
                    }
                    if (user.inv.hasOwnProperty('headset')) {
                        headsetAmount = user.inv['headset'].amount
                    } else {
                        headsetAmount = 0;
                    }
                    if (user.inv.hasOwnProperty('connect 4 trophy')) {
                        c4Amount = user.inv['connect 4 trophy'].amount
                    } else {
                        c4Amount = 0;
                    }
                    if (user.inv.hasOwnProperty('leztoken')) {
                        leztokenAmount = user.inv['leztoken'].amount
                    } else {
                        currentAmount = 0;
                    }
                    
                    user.inv['laptop'] = { name: "laptop", amount: laptopAmount + 10 }
                    user.inv['headset'] = { name: "headset", amount: headsetAmount + 10 }
                    user.inv['connect 4 trophy'] = { name: "connect 4 trophy", amount: c4Amount + 10 }
                    user.inv['leztoken'] = { name: "leztoken", amount: leztokenAmount - 1 }
                    api.modUser(message.author.id, user)
                        .then(() => {
                            const embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setTitle("Use Successful!")
                                .setDescription("You just used a super special item!, now check your inventory :o")
                            message.channel.send({embeds: [embed]})
                        })
                        .catch((err) => {
                            message.channel.send("Something went wrong...")
                            console.log(err)
                        })
                }
            })
    }
}