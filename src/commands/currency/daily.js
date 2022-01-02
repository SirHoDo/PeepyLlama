const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        const user = await api.changeBal(message.author.id, 5000)

        await addCD()
        message.reply(" your daily bonus of 5000 coins has been collected.")


    }, {
        name: "daily",
        aliases: ["daily"],
        cooldown: 86400000,
        cooldownMessage: "You already collected your daily money!\nTry again in **{timeleft}**!",
        perms: ["SEND_MESSAGES"],
        description: "Get some daily money! Offered by the Peepy Llama government!"
    }
)