const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js")
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const config = require('../../config');


var prefix = config.prefix
module.exports = new simpleCommand(
        async(message, args, client, addCD) => {
        
            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('help')
                .setPlaceholder('Choose Something')
                .addOptions([
                    {
                    label: "Currency",
                    value: 'currency',
                    description: 'Desc',
                    emoji: '💸'
                    },
                    {
                    label: "Games",
                    value: 'games',
                    description: 'Desc',
                    emoji: '🎲'
                    },
                    {
                    label: "General",
                    value: 'general',
                    description: 'Desc',
                    emoji: '🦙'
                    }

                ])
            )

            if (!args[0]) {
                var botIcon = client.user.displayAvatarURL();
                var home = ""
                client.categories.forEach(category => {
                    home += `**${category.name}**\n> \`${prefix}help ${category.id}\`\n\n`
                });
                await addCD()

                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setAuthor("Available Categories", botIcon)
                    .setDescription([
                        (`**Prefix:** \`${prefix}\``),
                        (`**Type** \`${prefix}help [command]\` **for detailed info.**\n`),
                        (`**ATTENTION** \`PeepyLlama\` **is open sourced. Check it out [HERE](https://github.com/SirHoDo/PeepyLlama) **\n\n`),
                        (home),
                    ].join('\n'));

                const filter = (interaction) => 
                interaction.isSelectMenu() && 
                interaction.user.id === message.author.id;

                const collector = message.channel.createMessageComponentCollector({ 
                    filter, 
                    max: "3"
                });

                collector.on('collect', async(collected) => {
                    const term = collected.values[0]
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
                        .setAuthor(category.name + " commands", botIcon)
                        .setDescription([
                            (`**Prefix:** \`${prefix}\``),
                            (`**Type** \`${prefix}help [command]\` **for detailed info.**\n\n`),
                            (desc),
                        ].join('\n'));
    
    
                message.channel.send({embeds: [embed], components: [row]})
                
               }
                })
                    
                message.channel.send({embeds: [embed], components: [row]})
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
                        (`**Prefix:** \`${prefix}\``),
                        (`**Type** \`${prefix}help [command]\` **for detailed info.**\n\n`),
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
        cooldown: 10000,
        cooldownMessage: "Glitch i think",
        description: "Used to view the entire commands Peepy has",
        perms:["SEND_MESSAGES"]   
    }
)