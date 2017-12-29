const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('../models/User');

module.exports = () => {
  passport.use(new TwitterTokenStrategy(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      includeEmail: true
    },
    (token, tokenSecret, profile, done) => {
      User.upsertTwitterUser(token, tokenSecret, profile, user => done(null, user));
    }
  ));
};
