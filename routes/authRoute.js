const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(verifyToken, logout);

module.exports = router;