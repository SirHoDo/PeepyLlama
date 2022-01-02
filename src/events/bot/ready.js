const processHandler = require("../../core/processhandler"),
clientHandler = require("../../core/clienthandler"),
Dashboard = require("../../../dashboard/dashboard"),
HTTP = require("../../http")
api = require('../../core/api'),
Event = require('../../structures/Event');

/**
 * Ready event
 * @event IUNGO#Ready
 * @extends {Event}
*/
class Ready extends Event {
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
	async run(client) {
		clientHandler(client)
		processHandler(client)
		Dashboard(client, api);
		HTTP(client);
		console.log("All guilds have been initialized.")
	}
}

module.exports = Ready;
