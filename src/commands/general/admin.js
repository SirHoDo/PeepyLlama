const fs = require("fs");
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand");
const api = require("../../core/api")
const config = require("../../config.js");
const itemfiles = new Discord.Collection();
const itemarray = fs.readdirSync(__dirname + "/../../items").filter(file => file.endsWith('.js'));
for (const file of itemarray) {
    const itemdata = require(`../../items/${file}`);
    itemfiles.set(itemdata.name, itemdata);
    //console.log(`${itemdata.name} item success`)
}
const items = require('../../json/items.json')

module.exports = new simpleCommand(async (message, args, client, addCD) => {
    if (!message.mentions.users.first()) {
        message.channel.send("`Editing your own profile`\n" + config.websiteURL + "staff/" + message.author.id + "/profile\n`Add @mention to edit another user`")
        return;
    } else {
        message.channel.send(config.websiteURL + "staff/" + message.mentions.users.first() + "/profile")
    }

    if (args[1] == "true") {
        const userAv = message.mentions.users.first()

        var user = await api.getUser(message.mentions.users.first().id)
        user.staff = {
            staff: true,
            role: "Staff",
            joined: Date.now(),
            avatar: userAv.avatarURL()
        }
        if (args[2]) {
            user.staff = {
                staff: true,
                role: args[2],
                joined: Date.now(),
                avatar: userAv.avatarURL()
            }
        }
        await api.modUser(message.mentions.users.first().id, user)
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle("ADMIN COMMAND")
            .setDescription(user.name + " Staff Updated: " + user.staff.staff)
        message.channel.send({ embeds: [embed] })
        await addCD()
    }
}, {
    name: "admin",
    hidden: true,
    aliases: ["admin", "setadmin"],
    description: "Buy an item from the shop!\nYou can view a list of commands by typing >shop",
    usage: "{prefix}{cmd} <item>",
    ownerOnly: true,
})