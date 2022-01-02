const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('../../config');


var prefix = config.prefix
module.exports = new simpleCommand(
        async(message, args, client, addCD) => {
            if (!args[0]) {
                var botIcon = client.user.displayAvatarURL();
                var home = "Mohney Mohney, Currency games by the IUNGO dev team\n\n"
                client.categories.forEach(category => {
                    home += `**${category.name}**\n\`${prefix}help ${category.id}\`\n\n`
                });
                await addCD()
                const linkRow = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setURL('https://peepy.info/commands/')
                                .setLabel('All Commands')
                                .setStyle('LINK')
                        )
                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setAuthor("Available Categories", botIcon)
                    .setDescription([
                        (`**Prefix:** \`${prefix}\` (Custom Prefix coming soon!)`),
                        (`**Type** \`${prefix}help [command]\` **for command specific information.**\n\n`),
                        (home),
                    ].join('\n'));
                    
                message.channel.send({embeds: [embed], components: [linkRow]})
            } else {
                var term = args.join(" ").toLowerCase().trim()
                if (client.categories.has(term)) {
                    var category = client.categories.get(term)
                    var desc = `${(category.desc?category.desc:`Here are a list of the **${category.id}** commands!`)}\nView more details of a command by typing \`>help <command>\`\n\n`
               var arr = []
               category.commands.forEach(command => {
                if(command.props.hasOwnProperty("hidden")) {
                    if(!command.props.hidden) arr[arr.length] = command.props.name
                } else {
                    arr[arr.length] = command.props.name
                }    
               })
               desc= desc+`\`${arr.join("`, `")}\``
            const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setAuthor("Available Commands", botIcon)
                    .setDescription([
                        (`**Prefix:** \`${prefix}\` (Custom Prefix coming soon!)`),
                        (`**Type** \`${prefix}help [command]\` **for command specific information.**\n\n`),
                        (desc),
                    ].join('\n'));


            message.channel.send({embeds: [embed]})
            
           } else if(client.commands.has(term)){
               var command = client.commands.get(term)
               const embed = new Discord.MessageEmbed()
               .setColor('#5d369d')
            .setTitle(`\`Commands: ${term}\``)
            .setDescription(`${(
                command.props.description ?
                `**Description**: ${command.props.description}` :
                ""
            )}
            ${(command.props.aliases ?
                `**Aliases**: ${command.props.aliases.join(", ")}` :
                ""
                )}
            ${(command.props.usage ?
                `**Usage**: ${command.props.usage.replace("{prefix}", prefix).replace("{cmd}", term).replace("{command}", term)}` :
                ""
                )}  
                  ${(command.props.perms ?
                    `**Needed Permissions**: \`${[...new Set(command.props.perms)].join(", ")}\`` :
                    ""
                    )}
                    
                        `)
                        message.channel.send({embeds: [embed]})
           } else {
               message.channel.send(`There is no command or category \`${term}\`\nTry running \`>help\` for a list of categories`)
           }


        }
        
        
    },
    {
        name: "help",
        aliases: ["help", "commands", "command"],
        cooldown: 0,
        cooldownMessage: "Glitch i think",
        description: "Test",
        perms:["SEND_MESSAGES"]   
    }
)