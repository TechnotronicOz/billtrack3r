var express = require('express'),
	router 	= express.Router(),
	pass 	= require('../config/passport');

/* GET home page. */
router.get('/', function(req, res) {
	pass.ensureAuthenticated(req, res, test);
	//res.render('index', { title: 'Express' });
});

function test(req, res) {
	console.log('test', arguments);
	res.render('index', { title: 'Express' });
}

module.exports = router;
