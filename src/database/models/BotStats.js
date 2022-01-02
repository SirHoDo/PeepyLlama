const { Schema, model } = require('mongoose');

const botStatSchema = Schema({
	messagesSent: Number,
    commandsUsed: Number
});

module.exports = model('BotStats', botStatSchema);
