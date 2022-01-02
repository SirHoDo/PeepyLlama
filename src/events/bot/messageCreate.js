const api = require('../../core/api'),
Discord = require('discord.js');
messagecli = require('../../core/messagecli'),
config = require('../../config.js'),
Event = require('../../structures/Event');

const { botStatsSchema }= require('../../database/models')

/**
 * Ready event
 * @event IUNGO#MessageCreate
 * @extends {Event}
*/
class MessageCreate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	/**
	 * Function for recieving event.
	 * @param {client} client The instantiating client
	 * @readonly
	*/
	async run(client, message) {
        const botStats = await botStatsSchema.find()
        await (botStatsSchema.findOneAndUpdate({
			messagesSent: botStats[0].messagesSent + 1,
            commandsUsed: botStats[0].commandsUsed
		}, {new: true, useFindAndModify: false}))
        
        client.messagesSent = botStats[0].messagesSent + 1
        client.messagesSent = botStats[0].commandsUsed 
        
        if (message.author.bot) return;
        if (message.content == `<@!${client.user.id}>`) {
            api.numOfUsers()
            .then((count) => {

                var prefix = config.prefix
                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setTitle(`Hey, ${message.author.username}#${message.author.discriminator}`);
                    embed.setDescription([
                        `Default Prefix: \`${prefix}\``,
                        `Unique Users: \`${api.numberWithCommas(count)}\``
                        ].join('\n'))
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
    
                    message.channel.send({embeds: [embed]});
    
            })
        }
        api.getUser(message.author.id)
            .then((user) => {
                var prefix = config.prefix
    
                if (!message.content.toLowerCase().startsWith(prefix)) return
                messagecli(message, client, user)

            })
            .catch((err) => {
                console.log(err)
                if (err.type == 0) {
                    api.createUser(message.author.id, message.author.username)
                        .then((user) => {
                            messagecli(message, client, user)
                            api.numOfUsers()
                                .then((count) => {
    
                                    const embed = new Discord.MessageEmbed()
                                    .setColor('#5d369d')
                                    .setTitle(`[NEW PROFILE] ${message.author.username}#${message.author.discriminator}`);
                                     embed.setDescription([
                                    `ID: ${message.author.id}`,
                                    `bal: 1000`,
                                    `inv: {},`,
                                    `Unique User: ${api.numberWithCommas(count)}${api.ordinal_suffix(count)}`
                                     ].join('\n'))
                                     .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256`)
                                     console.log("New account")
                                     
                                     client.channels.cache.get(config.SupportServer.GuildChannel).send({embeds: [embed]});
    
    
                                    api.log(`**NEW USER!** Welcome to Peepy Llama bot, **${message.author.username}**! They are our \`${api.numberWithCommas(count)}${api.ordinal_suffix(count)} user!\``, client)
                                })
    
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
    }
}

module.exports = MessageCreate;
