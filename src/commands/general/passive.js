const fs = require("fs");
const Discord = require("discord.js")
const simpleCommand = require("../../core/simpleCommand");
const api = require("../../core/api")
const itemfiles = new Discord.Collection();
const itemarray = fs.readdirSync(__dirname + "/../../items").filter(file => file.endsWith('.js'));
for (const file of itemarray) {
    const itemdata = require(`../../items/${file}`);
    itemfiles.set(itemdata.name, itemdata);
    //console.log(`${itemdata.name} item success`)
}
const items = require('../../json/items.json')

module.exports = new simpleCommand(async(message, args, client, addCD) => {

    var user = await api.getUser(message.author.id)

    if (!user.passive) {
        user.passive = true
        await api.modUser(message.author.id, user)
            const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle("Profile restrictions")
                    .setDescription("Passive Mode: \`"+user.passive+"\`")
                    .setFooter("Robbing and Begging have been disabled.")
                    message.channel.send({embeds: [embed]})
            await addCD()
    } else if (user.passive) {
        user.passive = false

        await api.modUser(message.author.id, user)
            const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTitle("Profile restrictions")
                    .setDescription("Passive Mode: \`"+user.passive+"\`")
                    .setFooter("Robbing and Begging have been enabled.")
                    message.channel.send({embeds: [embed]})
            await addCD()
    }
       
    
    
}, {
    name: "passive",
    cooldown: 1.8e+6,
    aliases: ["noob", "ghost"],
    description: "Buy an item from the shop!\nYou can view a list of commands by typing >shop",
    usage: "{prefix}{cmd} <item>"
})