const express = require('express');
const router = express.Router();
const unitController = require('../../controllers/master/UnitController');

router.get('/units', unitController.getUnits);
router.get('/units/:id', unitController.getUnitById);
router.post('/units', unitController.createUnit);
router.put('/units/:id', unitController.updateUnit);
router.delete('/units/:id', unitController.deleteUnit);

module.exports = router;