const express = require('express');
const userController = require('../controllers/userController');
const utilityController = require('../controllers/utilityController');

const router = express.Router();

router.get('/', userController.home);
// router.get('/seed', utilityController.seedDB);
router.get('/sample', userController.getSampleData);

router.get('/login', userController.login);

module.exports = router;
