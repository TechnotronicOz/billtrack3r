var express = require('express'),
	router 	= express.Router(),
	pass 	= require('../config/passport');

/* GET home page. */
router.get('/', function(req, res) {
	pass.ensureAuthenticated(req, res, checkUserState);
	//res.render('index', { title: 'Express' });
});

function checkUserState(req, res) {
	if (req.user) {
		//return res.render('index', { title: 'BillTrack3r', user: req.user });
        res.redirect('/app');
	}
	return res.redirect('/login');
}

module.exports = router;
