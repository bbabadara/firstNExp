const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategorieController'); 

router.get('/', controller.getAllCategories);        
router.get('/:id', controller.getCategorieById);
router.post('/', controller.createCategorie);
router.put('/:id', controller.updateCategorie);
router.delete('/:id', controller.deleteCategorie);

module.exports = router;
