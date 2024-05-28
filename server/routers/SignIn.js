const electricalProductsController = require('../controllers/electricalProductsController')

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => await SignIn.getAll(req ,res, ()=>{}));

module.exports = router;