const SignController = require('../controllers/AccountAccessController');

const express = require('express');
const router = express.Router();

router.post('/signin',  async (req, res) => await SignController.signIn(req ,res));
router.post('/signup', async (req, res) => await SignController.signUp(req ,res));
router.post('/forgotpassword', async (req, res) => await SignController.forgotPassword(req ,res));
router.post('/checkcode', async (req, res) => await SignController.checkCodeFromEmail(req ,res));
router.post('/newpassword', async (req, res) => await SignController.newPassword(req, res));

module.exports = router;