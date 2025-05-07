const express = require('express');
const personnesController = require('../controllers/personnesController');


const router = express.Router();
router.get('/', personnesController.getAllPersonnes);
router.get('/:id', personnesController.getPersonneById);
router.post('/', personnesController.createPersonne);
router.put('/:id', personnesController.updatePersonne);
router.delete('/:id', personnesController.deletePersonne);


module.exports = router;