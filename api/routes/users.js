const express = require('express');
const router = express.Router();
const createRouter = express.Router();
const userController = require('../controllers/users');

createRouter.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/logout', userController.logout);

module.exports = { router, createRouter };