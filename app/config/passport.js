var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('../../server/datasets/users.js');

// load the auth variables
var configAuth = require('./auth');

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


    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'name']
      },

    //   function(accessToken, refreshToken, profile, done) {

    //     process.nextTick(function(){

    //         console.log('testing');
    //         console.log(req.user);

    //         User.findOne({'facebook.id': profile.id}, function(err, user){
    //             if(err){
    //                  return done(err);
    //             }if(user){

    //                 console.log('user found');
    //                 return done(null, user);
    //             }else{

    //                 var newUser = new User();

    //                 newUser.facebook.id = profile.id;
    //                 newUser.facebook.token = accessToken;
    //                 newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;

    //                 newUser.save(function(err){
    //                     if(err){
    //                         throw err;

    //                     }else{
    //                         return done(null, newUser);
    //                     }
    //                 })
    //             }
    //         })
    //     })

    //   }
    // ));



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

                console.log('returning user');
                console.log(user);
                if(err){
                     return done(err);
                }if(user){


                    console.log('user found');
                    return done(null, user);
                }else{

                    var newUser = new User();

                    newUser.google.id       = profile.id;
                    newUser.google.token    = accessToken;
                    newUser.google.name     = profile.displayName;
                    newUser.google.email    = profile.emails[0].value;

                    console.log(newUser);

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
