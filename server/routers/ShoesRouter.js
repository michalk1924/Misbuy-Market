
const shoesController = require('../controllers/ShoesController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => await shoesController.getAll(req ,res));
router.get('/:id', async (req, res) => await shoesController.get(req, res));
router.post('/', auth('connected'), async (req, res) => await shoesController.insert(req, res));
router.delete('/:id', auth('connected'), async (req, res) => await shoesController.delete(req, res));
router.put('/:id', auth('connected'), async (req, res) => await shoesController.put(req, res));

module.exports = router;
