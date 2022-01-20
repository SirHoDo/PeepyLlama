// Dependencies
const express = require('express'),
	router = express.Router();

module.exports = (client) => {
	// statistics page
	router.get('/', async function(req, res) {

		var data = await api.numOfUsers()
		var rich = await api.getAll()
	    const sorted = Object.values(rich).sort((a, b) => b.data.bal - a.data.bal)

		var richest = []
		sorted.forEach((entry, i) => {
			if (i == 0) return richest = { "name": entry.data.name, "bal": entry.data.bal, "staff": entry.data.staff }
		})
		res.status(200).json({
			guildCount: client.guilds.cache.size,
			cachedUsers: client.users.cache.size,
			totalMembers: client.guilds.cache.map(g => g).reduce((a, b) => a + b.memberCount, 0),
			uptime: Math.round(process.uptime() * 1000),
			commandCount: client.commands.size,
			memoryUsed: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
			textChannels: client.channels.cache.filter(({ type }) => type === 'GUILD_TEXT').size,
			voiceChannels: client.channels.cache.filter(({ type }) => type === 'GUILD_VOICE').size,
			ping: Math.round(client.ws.ping),
			accounts: data,
			richest: richest
			
		});
	});

	return router;
};
