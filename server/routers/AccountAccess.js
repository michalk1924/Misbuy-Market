const SignController = require('../controllers/AccountAccessController');

const express = require('express');
const router = express.Router();

router.post('/signin', async (req, res) => await SignController.SignIn(req ,res));
router.post('/signup', async (req, res) => await SignController.SignUp(req ,res));

module.exports = router;