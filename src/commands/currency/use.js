const fs = require('fs')
const items = require('../../json/items.json');
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
    //Name, Description, price
const itemfiles = new Discord.Collection();
const itemarray = fs.readdirSync('./src/items/').filter(file => file.endsWith('.js'));
for (const file of itemarray) {
    const itemdata = require(`../../items/${file}`);
    itemfiles.set(itemdata.name, itemdata);
}


module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var item = args.join(' ').toLowerCase()
        if (item != 0) {


            if (items.hasOwnProperty(item)) {
                api.getUser(message.author.id)
                    .then((user) => {
                        if (!user.hasOwnProperty("inv")) {
                            user.inv = {}
                        }

                        if (user.inv.hasOwnProperty(item)) {



                            var userItem = user.inv[item]
                            itemfiles.get(item).use(message, userItem, user)





                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#5d369d')
                                .setTitle("You dont have the item `" + item + "`. You can buy it by typing `>buy " + item + "`")
                            message.channel.send({embeds: [embed]})
                        }

                    })
                    .catch((err) => {
                        if (err.type == 0) {
                            const embed = new Discord.MessageEmbed()
                                .setColor('#5d369d')
                                .setTitle("This user doesnt have an account!")
                            message.channel.send({embeds: [embed]})
                        } else {
                            message.channel.send("Something went wrong.")
                        }
                    })
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("Not found")
                    .setDescription("The item `" + item + "` was not found\nType `>shop` for a list of items")
                message.channel.send({embeds: [embed]})
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle("No item entered")
                .setDescription("Please use the command like `>use <itemname>`\nType `>inv` for a list of your items")
            message.channel.send({embeds: [embed]})
        }

    }, {
        name: "use",
        aliases: ["use"],
        cooldown: 0,
        cooldownMessage: "",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd} <itemname>",
        description: "Use an item!"
    }
)