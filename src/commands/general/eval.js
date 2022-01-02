const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")
const Discord = require("discord.js")
const config = require("../../config.js")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {

    try {
      const code = message.content.split(" ").slice(1).join(" ");
      let evaled = eval(code);
      
 
      if (!typeof evaled == "string") evaled = require("util").inspect(evaled);
      if (!evaled){
        evaled = "Missing result"
      }
      message.channel.send("Result:\n``" + evaled + "``");
    } catch (err) {
    console.log(err)
    //message.channel.send(err)
    }
  

    }, {
        name: "eval",
        hidden: true,
        aliases: ["eval"],
        cooldown: 0,
        cooldownMessage: "mmm",
        perms: ["SEND_MESSAGES"],
        description: "mmm",
        ownerOnly: true
    }
)