const express = require('express');
const router = express.Router();
const brandController = require('../../controllers/master/BrandController');

router.get('/brands', brandController.getBrands);
router.post('/brands', brandController.createBrand);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

module.exports = router;