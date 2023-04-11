
const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/', passport.checkAuthentication, userController.home);

router.use('/users', require('./users'));
router.use('/reviews', require('./review'));
router.use('/admin', require('./admin'));



module.exports = router;