
<<<<<<< HEAD
=======

>>>>>>> 8a785c19714bcbdcc7f375909a434f905436de81
const electricalProductsController = require('../controllers/electricalProductsController')

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => await electricalProductsController.getAll(req ,res));
router.get('/:id', async (req, res) => await electricalProductsController.get(req, res));
router.post('/', async (req, res) => await electricalProductsController.insert(req, res));
router.delete('/:id', async (req, res) => await electricalProductsController.delete(req, res));
router.put('/:id', async (req, res) => await electricalProductsController.put(req, res));

module.exports = router;
