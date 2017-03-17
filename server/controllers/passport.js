var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../datasets/users.js');

// load the auth variables
var configAuth = require('../../app/config/auth.js');

module.exports = function(passport) {



	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});


	//Google Strategy

  passport.use(new GoogleStrategy({
		clientID: configAuth.googleAuth.clientID,
		clientSecret: configAuth.googleAuth.clientSecret,
		callbackURL: configAuth.googleAuth.callbackURL,
		profileFields: ['id', 'emails', 'name']
  },

  function(accessToken, refreshToken, profile, done) {
	process.nextTick(function(){

		User.findOne({'google.id': profile.id}, function(err, user){


			// console.log('json should be ');
			// console.log(test);

			if(err){
				 return done(err);
			}

			if(user){

				return done(null, user);
			}

			else{
				console.log('creating user');


				var newUser = new User();

				newUser.google.id       = profile.id;
				newUser.google.token    = accessToken;
				newUser.google.name     = profile.displayName;
				newUser.google.email    = profile.emails[0].value;


				newUser.save(function(err){
					if(err){
						throw err;

					}else{
						return done(null, newUser);
					}
				})
			}
		})
	})

  }
));




};
