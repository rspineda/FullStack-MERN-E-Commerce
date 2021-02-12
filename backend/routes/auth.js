const express = require('express');
const router = express.Router();

//midlewares
const { authChech } = require('../middlewares/auth');

//import
const { createOrUpdateUser } = require('../controllers/auth');

router.post('/create-or-update-user', authChech ,createOrUpdateUser);

module.exports = router;