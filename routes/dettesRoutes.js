const express = require('express');
const router = express.Router();
const controller = require('../controllers/DetteController');

router.get('/', controller.getAllDettes);
router.get('/:id', controller.getDetteById);
router.post('/', controller.createDette);
router.delete('/:id', controller.deleteDette);

module.exports = router;
