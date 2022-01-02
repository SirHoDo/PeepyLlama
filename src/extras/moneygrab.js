const api = require("../core/api")
const { getRandomInt } = api
module.exports = (message) => {
    message.channel.send("Look! floor treasure. \n**TYPE** `take` **TO TAKE THE MONEY**!!")
        .then((jdjg6) => {
            var x = false
            const filter = m => !(m.author.bot);
            const collector67 = message.channel.createMessageCollector({ filter, time: 20000 })
            collector67.on("collect", (message43) => {
                if (!x) {

                    if (message43.content.toLowerCase() == "catch" || message43.content.toLowerCase() == "take" || message43.content.toLowerCase() == "pick") {

                        //catch
                        var moneyetn = getRandomInt(10000, 20000)

                        api.changeBal(message43.author.id, moneyetn)
                            .then((use22r) => {
                                x = true;
                                message.channel.send(`${use22r.name} picked up \`${moneyetn}\` Peepy Bucks from the ground!`)
                                jdjg6.edit(`Look theres some Peepy Bucks! \n**EDIT**: ${use22r.name} picked it up!`)
                            })
                            .catch((err) => {
                                if (err.type != 0) {
                                    message43.channel.send("Something went wrong")
                                }
                            })



                    }
                }
            })
            collector67.on("end", () => {
                if (!x) {
                    //money spills

                    jdjg6.edit("Look theres some Peepy Bucks on the ground!!! \n**EDIT**: Tough luck, a Llama found it.")

                }
            })


        })
}