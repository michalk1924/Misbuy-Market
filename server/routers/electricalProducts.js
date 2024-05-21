
const electricalProductsController = require('../controllers/electricalProductsController')

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => await electricalProductsController.getAll(req ,res, ()=>{}));
router.get('/:electricalProductId', (req, res) => electricalProductsController.get(req, res) );
router.post('/', async (req, res) => await electricalProductsController.insert(req, res, ()=>{}));
router.delete('/:electricalProductId', (req, res) => electricalProductsController.delete(req, res));
router.put('/:electricalProductId', (req, res) => electricalProductsController.put(req, res));

module.exports = router;
