
const usersController = require('../controllers/UsersController')

const express = require('express');
const router = express.Router();
const {auth} = require('../middleware');

router.get('/:id', auth('connected', 'get'), async (req, res) => await usersController.get(req, res));
router.delete('/:id', auth('connected', 'delete'), async (req, res) => await usersController.delete(req, res));
router.put('/:id', auth('connected', 'put'), async (req, res) => await usersController.put(req, res));
router.get('/:id/items', auth('connected', 'get'), async (req, res) => await usersController.getUserItems(req, res));

module.exports = router;