
const allItemsController = require('../controllers/allItemsController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/:id', async (req, res) => await allItemsController.get(req, res));
router.get('/', async (req, res) => await allItemsController.getAll(req ,res));
router.delete('/', auth('connected'), async (req, res) => await allItemsController.deleteAll(req, res));
module.exports = router;
