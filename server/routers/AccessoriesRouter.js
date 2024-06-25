
const accessoriesController = require('../controllers/AccessoriesController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');
const multer = require('multer');
const upload = multer();

router.get('/', async (req, res) => await accessoriesController.getAll(req ,res));
router.get('/:id', async (req, res) => await accessoriesController.get(req, res));
router.post('/', async (req, res) => await accessoriesController.insert(req, res));
router.delete('/:id', auth('connected'), async (req, res) => await accessoriesController.delete(req, res));
router.put('/:id', auth('connected'), async (req, res) => await accessoriesController.put(req, res));

module.exports = router;
