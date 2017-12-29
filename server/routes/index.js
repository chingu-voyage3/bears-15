const express = require('express');
const userController = require('../controllers/userController');
const utilityController = require('../controllers/utilityController');
const authController = require('../controllers/authController');
const passport = require('passport');
const passportConfig = require('../handlers/passportConfig');

passportConfig();
const router = express.Router();

router.get('/', userController.home);
// router.get('/seed', utilityController.seedDB);
router.get('/sample', userController.getSampleData);

router.post('/auth/twitter/reverse', authController.twitterRequestToken);

router.post(
  '/auth/twitter',
  authController.twitterAuthorizeUser,
  passport.authenticate('twitter-token', { session: false }),
  authController.twitterCompleteAuth,
  utilityController.generateToken,
  utilityController.sendToken
);

module.exports = router;
