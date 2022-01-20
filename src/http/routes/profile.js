const express = require('express'),
	router = express.Router();
	api = require("../../core/api")

module.exports = (client) => {

	const commands = client.commands

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

    router.get('/:userID/balance', async (req, res) => {

        if (req.query.num) {
        const userID = req.params.userID
        var user = await api.getUser(userID)

        res.status(200).json({ "OldBal": user.bal, "NewBal": req.query.num });
        
        var money = req.query.num
        var toAdd = parseInt(money);
        user.bal = toAdd;

        await api.modUser(userID, user)

        } else {
			res.status(200).json({ error: 'Missing new balance'	});
		}
	});

	router.get('/:userID/daily', async (req, res, addCD) => {
		var commandobj = commands.get("daily")
		api.checkCool(req.params.userID, commandobj.props.name)
		.then((cooldown) => {
			if (cooldown.cooldown) {
				res.status(200).json({ error: 'Cooldown Active'	});
			} else {
				try {
					const user = api.changeBal(req.params.userID, 5000)
					res.status(200).json({ success: 'Daily bonus claimed'	});
					return api.addCool(req.params.userID, commandobj.props.name, commandobj.props.cooldown)
				} catch (e) {
					console.log(e)
					res.status(200).json({ e });
				}
			}
		})
		.catch((e) => {
			console.log(e)
		})
	});

	return router;
};
