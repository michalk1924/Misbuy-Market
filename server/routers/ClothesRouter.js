
const clothesController = require('../controllers/ClothesController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => await clothesController.getAll(req ,res));
router.get('/:id', async (req, res) => await clothesController.get(req, res));
router.post('/', upload.single('image'), async (req, res) => await clothesController.insert(req, res));
router.delete('/:id', auth('connected'), async (req, res) => await clothesController.delete(req, res));
router.put('/:id', auth('connected'), async (req, res) => await clothesController.put(req, res));

module.exports = router;
