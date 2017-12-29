const request = require('request');

exports.twitterRequestToken = (req, res, next) => {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: process.env.CLIENT_HOST,
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET
      }
    },
    (err, r, body) => {
      if (err) return res.send(500, { message: err.message });
      const jsonStr = `{"${body.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
      res.send(JSON.parse(jsonStr));
    }
  );
};

exports.twitterAuthorizeUser = (req, res, next) => {
  request.post(
    {
      url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
      oauth: {
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        token: req.query.oauth_token
      },
      form: { oauth_verifier: req.query.oauth_verifier }
    },
    (err, r, body) => {
      if (err) return res.send(500, { message: err.message });
      const bodyString = `{"${body.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
      const parsedBody = JSON.parse(bodyString);

      req.body.oauth_token = parsedBody.oauth_token;
      req.body.oauth_token_secret = parsedBody.oauth_token_secret;
      req.body.user_id = parsedBody.user_id;

      return next();
    }
  );
};


exports.twitterCompleteAuth = (req, res, next) => {
  if (!req.user) {
    return res.send(401, 'User not Authenticated');
  }

  // prepare token for API
  req.auth = { id: req.user.id };

  return next();
};
