const express = require('express');
const router = express.Router();
const productImageController = require('../../controllers/master/ProductImageController');

router.get('/productimages', productImageController.getProductImages);
router.post('/productimages', productImageController.createProductImage);
router.delete('/productimages/:id', productImageController.deleteProductImage);

module.exports = router;