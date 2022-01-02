const Discord = require("discord.js")

var commands = new Discord.Collection();

const api = require("./api");
const config = require("../config.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { owners } = require("../../package.json")

function isAO(str) {
    try {
        if (str.toString() == "[object Object]") {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
module.exports = async(message, client) => {
    var prefix = ">"

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const commands = client.commands
    try {
        if (commands.has(command)) {

            var commandobj = commands.get(command)
            var user = await api.getUser(message.author.id)
            if (!message.guild.me.permissions.has("SEND_MESSAGES")) return console.log("dont have send msg perms")
            if (commandobj.props.hasOwnProperty("ownerOnly") && !user.staff){ 
                const linkRow = new MessageActionRow()
                .addComponents(
                new MessageButton()
                .setURL('https://peepy.info/staff/')
                .setLabel('Peepy Staff')
                .setStyle('LINK')
                )
                const embed = new Discord.MessageEmbed()
                .setColor('#5d369d')
                .setTitle("Staff Only")
                .setDescription("This is a staff only command, please contact staff if you believe this is a mistake.")
                return message.channel.send({embeds: [embed], components: [linkRow]}) }
                
            if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send("Make sure I have `Embed Links` permission!\nYou can give me this by click Server settings > My role and check Embed Links!")
            if (commandobj.props.perms.some(perm => !message.guild.me.permissions.has(perm))) {
                const neededPerms = commandobj.props.perms.filter(perm => !message.guild.me.permissions.has(perm))
                message.channel.send("I need the following perms to run this command\n" + neededPerms.join(" "))
            } else {
                api.checkCool(message.author.id, commandobj.props.name)
                    .then((cooldown) => {

                        if (cooldown.cooldown) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('#5d369d')

                            .setTitle("Cooldown")
                                .setDescription(commandobj.props.cooldownMessage.replace("{timeleft}", api.convertMS(cooldown.msleft)))
                            message.channel.send({embeds: [embed]})
                        } else {
                            const addCD = () => {
                                return api.addCool(message.author.id, commandobj.props.name, commandobj.props.cooldown)
                            }
                            try {
                                commandobj.fn(message, args, client, addCD)
                                    .catch(e => {

                                        const embed = new MessageEmbed()
                                        .setTitle("Lol oops, Ethan make brokey")
                                        .setDescription(`An error has occured, if this keeps coming again and again contact the owner\n\`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``)

                                        message.channel.send({embeds: [embed]})
                                        console.log(e)
                                    })

                            } catch (e) {

                                console.log(e)
                                message.channel.send(`Test \`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``)
                  
                            }


                        }
                    })
                    .catch((e) => {
                        message.channel.send(`Test \`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``)
                    })

            }

        }
    } catch (e) {
        message.channel.send(`Test \`\`\`${(isAO(e)?JSON.stringify(e):e.toString())}\`\`\``)
    }
}