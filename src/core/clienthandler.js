const api = require("./api")

module.exports = (client) => {
    var stats = [`for ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} accounts`, `banking ${client.guilds.cache.size} guilds`]

        setInterval(function() {

            let status = stats[Math.floor(Math.random() * stats.length)];
            api.numOfUsers()
                .then((data) => {
                    stats = [`on ${client.guilds.cache.size} guilds`, `with ${api.numberWithCommas(data)} users!`]
                    client.user.setActivity('>help ' + status, { type: 'PLAYING', url: 'https://peepy.info/' });
                })
                .catch(() => {
                    client.user.setActivity({
                        activity: {
                            name: status,
                            type: "WATCHING"
                        },
                        status: "available"
                    });
                })
        }, 5000)
}