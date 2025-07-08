const express = require('express');
const router = express.Router();
const manufacturerController = require('../../controllers/master/ManufacturerController');

router.get('/manufacturers', manufacturerController.getManufacturers);
router.post('/manufacturers', manufacturerController.createManufacturer);
router.put('/manufacturers/:id', manufacturerController.updateManufacturer);
router.delete('/manufacturers/:id', manufacturerController.deleteManufacturer);

module.exports = router;