const express = require('express');
const router = express.Router();
const personnesController = require('../controllers/PersonneController');
router.get('/', personnesController.getAllPersonnes);
router.get('/:id', personnesController.getPersonneById);
router.post('/', personnesController.createPersonne);
router.put('/:id', personnesController.updatePersonne);
router.delete('/:id', personnesController.deletePersonne);


module.exports = router;