
const shoesController = require('../controllers/ShoesController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => await shoesController.getAll(req ,res));
router.get('/:id', async (req, res) => await shoesController.get(req, res));
router.post('/', upload.single('image'), auth('connected', 'post'), async (req, res) => await shoesController.insert(req, res));
router.delete('/:id', auth('connected', 'delete'), async (req, res) => await shoesController.delete(req, res));
router.put('/:id', upload.single('image'), auth('connected', 'put'), async (req, res) => await shoesController.update(req, res));

module.exports = router;
