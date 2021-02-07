var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../middleware/authenticate');
const Panel = require('../models/panel.model');
const converter = require('../util/converter');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

/**
 * @description login
 */
router.post('/', async (req, res) => {
	passport.authenticate('local', async (err, user) => {
		try {
			let panelID = "";
			if (err || !user) {
				return res.status(200).send({ success: false, status: 'Unauthorized!' });
			}
			var token = authenticate.getToken({ userID: user.id  });
			console.log(user);
			let success = true;
			if (!token) {
				success = false;
				return res.status(200).send("Password incorrect");
			}else{
				if(user.role == "Panel"){
					panel = await Panel.findOne({where:{userID:user.id}});
					if(panel){
						panelID = panel.panelID;

					}
				}
			}
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			return res.status(200).send({ success: success, token: token, type: user.role, panelID:panelID, userID:user.id });
		} catch (error) {
			return res.status(400).send(error.message);
		}
	})(req, res);
});

passport.authenticate();

// router.post('/login', async (req, res, next) => {
// 	passport.authenticate('local',
// });

module.exports = router;
