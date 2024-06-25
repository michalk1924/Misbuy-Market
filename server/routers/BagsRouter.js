
const bagsController = require('../controllers/BagsController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => await bagsController.getAll(req ,res));
router.get('/:id', async (req, res) => await bagsController.get(req, res));
router.post('/', auth('connected'), upload.single('image'), async (req, res) => await bagsController.insert(req, res));
router.delete('/:id', auth('connected'), async (req, res) => await bagsController.delete(req, res));
router.put('/:id', auth('connected'), async (req, res) => await bagsController.put(req, res));

module.exports = router;
