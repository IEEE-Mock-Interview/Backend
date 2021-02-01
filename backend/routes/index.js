var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../middleware/authenticate');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

/**
 * @description login
 */
router.post('/', async (req, res) => {
	passport.authenticate('local', async (err, user, info) => {
		try {
			if (err || !user) {
				return res.status(200).send({ success: false, status: 'Unauthorized!' });
			}
			var token = authenticate.getToken({ userID: user.id  });
			console.log(user);
			let success = true;
			if (!token) {
				success = false;
				return res.status(200).send("Password incorrect");
			}
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			return res.status(200).send({ success: success, token: token, type: user.role, stationID: user.stationID });
		} catch (error) {
			return next(error);
		}
	})(req, res);
});

passport.authenticate();

// router.post('/login', async (req, res, next) => {
// 	passport.authenticate('local',
// });

module.exports = router;
