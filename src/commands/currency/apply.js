const api = require("../../core/api")
const simpleCommand = require("../../core/simpleCommand");
const Discord = require("discord.js");
const jobs = require('../../json/jobs.json')
const fs = require("fs")
const jobfiles = new Discord.Collection();
const jobarray = fs.readdirSync('./src/jobs/').filter(file => file.endsWith('.js'));
for (const file of jobarray) {
    const jobdata = require(`../../jobs/${file}`);
    jobfiles.set(jobdata.name, jobdata);
    console.log("Loading Jobs: " + `${file}`)
}
module.exports = new simpleCommand(
    async(message, args, client, addCD) => {
        var user = await api.getUser(message.author.id)

        var job = args.join(' ').toLowerCase()
        if (jobs.hasOwnProperty(job)) {

            //add inventory if does not exist
            if (!user.hasOwnProperty("job")) {
                user.job = { exists: false }
            }


            //check if already have job
            if (user.job.exists) {
                const embed = new Discord.MessageEmbed()
                    .setColor('#5d369d')
                    .setTitle("Silly goose! You already have a job.")
                    .setDescription("You are currently working as `" + user.job.name + "`!")
                message.channel.send({embeds: [embed]})
            } else {
                api.checkCool(message.author.id, "applyfail")
                    .then((cooldown) => {

                        if (cooldown.cooldown) {

                            const embed = new Discord.MessageEmbed()
                                .setColor('#5d369d')
                                .setTitle("Slow down.")
                                .setDescription("Your last interview went bust! let's give it some time to blow over.\nYou can apply for a new job in `" + api.convertMS(cooldown.msleft) + "`")
                            message.channel.send({embeds: [embed]})
                        } else {
                            jobfiles.get(job).interview(message, (pass) => {

                                message.channel.send("Interviewers are discussing...")
                                    .then((msg11) => {
                                        setTimeout(() => {
                                            msg11.edit("Checking the shortlist..")
                                                .then((msg22) => {
                                                    setTimeout(async() => {
                                                        if (pass) {
                                                            user.job = {
                                                                exists: true,
                                                                name: job
                                                            }
                                                            await api.modUser(message.author.id, user)
                                                            const embed = new Discord.MessageEmbed()
                                                                .setColor('GREEN')
                                                                .setTitle(user.name + ", You're hired!")
                                                                .setDescription("Congrats!!\nYou are now a `" + job + "`\nYour job starts now!")
                                                                .setFooter("Start your work by typing `>work`")
                                                            msg22.delete()
                                                            message.channel.send({embeds: [embed]})




                                                        } else {
                                                            await addCD()
                                                            const embed = new Discord.MessageEmbed()
                                                                .setColor('RED')
                                                                .setTitle(user.name + ", You failed the interview.")
                                                                .setDescription("It looks like you weren't the best for the job.\nTry again later...")
                                                            msg22.delete()
                                                            message.channel.send({embeds: [embed]})

                                                        }
                                                    }, 1000)
                                                })
                                        }, 1000)
                                    })
                            }, user)
                        }
                    })

            }




        } else {
            if (job == "") {
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("No job entered")
                    .setDescription("Please use the command `>apply <jobname>`\nType `>jobs` for a list of jobs")
                message.channel.send({embeds: [embed]})
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle("Not found")
                    .setDescription("The job `" + job + "` was not found\nType `>jobs` for a list of jobs")
                message.channel.send({embeds: [embed]})
            }

        }



    }, {
        name: "apply",
        aliases: ["apply", "jobapply"],
        cooldown: 43200000,
        cooldownMessage: "You failed your previous job interview\nYou can apply for a job in **{timeleft}**",
        perms: ["SEND_MESSAGES"],
        description: "Apply for a job <jobname>! You can view a list of the available jobs by typing >jobs",
        usage: "{prefix}{cmd} <jobname>"
    }
)