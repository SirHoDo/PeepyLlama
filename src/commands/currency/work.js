const Discord = require('discord.js')
const jobjson = require("../../json/jobs.json")
const fs = require('fs');
const jobfiles = new Discord.Collection();

const jobarray = fs.readdirSync("./src/jobs").filter(file => file.endsWith('.js'));
for (const file of jobarray) {
    const jobdata = require(`../../jobs/${file}`);
    jobfiles.set(jobdata.name, jobdata);
}
const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand")

module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)
        if (!user.hasOwnProperty("job")) {
            user.job = { exists: false }
        }
        if (user.job.exists) {
            jobfiles.get(user.job.name).work(message, (moneyEarned) => {
                var dafunc = (typeof moneyEarned == "number" ? api.changeBal : api.modUser)
                dafunc(message.author.id, moneyEarned)
                    .then(() => {
                        api.addCool(message.author.id, "work", (jobjson.hasOwnProperty(user.job.name.toLowerCase()) ? jobjson[user.job.name][3] : 900000))
                    })


            }, user)
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('#5d369d')
                .setTitle("You dont have an job! View a list of jobs by typing `>jobs`")
            message.channel.send({embeds: [embed]})
        }

    }, {
        name: "work",
        aliases: ["work"],
        cooldown: 0,
        cooldownMessage: "We legally cannot let you work too much, you can work again in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        usage: "{prefix}{cmd}",
        description: "Lets you work at your job, you can get a job by typing `>joblist`"
    }
)