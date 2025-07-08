const express = require('express');
const router = express.Router();
const conceptController = require('../../controllers/master/ConceptController');

router.get('/concepts', conceptController.getConcepts);
router.post('/concepts', conceptController.createConcept);
router.put('/concepts/:id', conceptController.updateConcept);
router.delete('/concepts/:id', conceptController.deleteConcept);

module.exports = router;