const express = require('express'),
	router = express.Router();
	api = require("../../core/api")

module.exports = (bot) => {
	router.get('/', async function(req, res) {
		var all = await api.getAll()
		res.status(200).json({ all });
	});
	router.get('/:userID', async function(req, res) {
		if (req.params.userID) {
			var data = await api.getUser(req.params.userID).catch((err) => {
                res.status(200).json({ err });
            })
			res.status(200).json({ data });
		} else {
			res.status(200).json({ error: 'Missing user ID'	});
		}
	});

	return router;
};
