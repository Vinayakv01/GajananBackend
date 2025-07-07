const express = require('express');
const router = express.Router();
const userController = require('../../controllers/master/UserController');

router.post('/users', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;