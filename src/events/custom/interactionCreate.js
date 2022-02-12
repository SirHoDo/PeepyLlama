const { Message } = require("discord.js");
const processHandler = require("../../core/processhandler"),
clientHandler = require("../../core/clienthandler"),
Dashboard = require("../../../dashboard/dashboard"),
HTTP = require("../../http")
api = require('../../core/api'),
Event = require('../../structures/Event');

/**
 * interactionCreate event
 * @event IUNGO#interactionCreate
 * @extends {Event}
*/
class interactionCreate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
			once: true,
		});
	}

	/**
	 * Function for recieving event.
	 * @param {client} client The instantiating client
	 * @readonly
	*/
	async run(client, interaction) {
		interaction.message.delete();
		console.log(interaction.message.id) 
	}
}

module.exports = interactionCreate;
