
const accessoriesController = require('../controllers/AccessoriesController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => await accessoriesController.getAll(req ,res));
router.get('/:id', async (req, res) => await accessoriesController.get(req, res));
router.post('/', upload.single('image'), auth('connected', 'post'), async (req, res) => await accessoriesController.insert(req, res));
router.delete('/:id', auth('connected', 'delete'), async (req, res) => await accessoriesController.delete(req, res));
router.put('/:id', upload.single('image'), auth('connected', 'put'), async (req, res) => await accessoriesController.update(req, res));

module.exports = router;
