var passport = require('passport');

var account = function(req, res) {
	res.render('account', { user: req.user });
};

var getlogin = function(req, res) {
	//res.render('login', { user: req.user });
	res.render('login', { user: req.user, message: req.session.messages });
};

var admin = function(req, res) {
	res.send('access granted admin!');
};
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
var postlogin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { 
			return next(err);
		}

		if (!user) {
			req.session.messages = [info.message];
			//return res.redirect('/login');
			return res.render('login', { user: req.user, message: req.session.messages });
		}

		req.logIn(user, function(err) {
			if (err) { 
				return next(err); 
			}
			//return res.render('index', { user: user });
			return res.redirect('/app/#' + user._id);
		});
	})(req, res, next);
};

var logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

module.exports  = {
	account: account,
	getlogin: getlogin,
	admin: admin,
	postlogin: postlogin,
	logout: logout
}
