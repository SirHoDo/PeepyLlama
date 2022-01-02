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
    const linkRow = new Discord.MessageActionRow()
        .addComponents(
        new Discord.MessageButton()
        .setURL('https://discord.com/api/oauth2/authorize?client_id=569158661499518976&scope=bot+applications.commands&permissions=1073081686')
        .setLabel('INVITE')
        .setStyle('LINK')
        )

    const embed = new Discord.MessageEmbed()
		.setColor('#5d369d')
		.setDescription('🤖 [Invite me to your server](https://discord.com/api/oauth2/authorize?client_id=569158661499518976&scope=bot+applications.commands&permissions=1073081686)');
		message.channel.send({ embeds: [embed], components: [linkRow] });
    
}, {
    name: "invite",
    cooldown: 0,
    aliases: ["invite", "join"],
    description: "Invite the bot to your server",
    usage: "{prefix}{cmd}"
})