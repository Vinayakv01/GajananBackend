const express = require('express');
const router = express.Router();
const sizeController = require('../../controllers/master/SizeController');

router.get('/sizes', sizeController.getSizes);
router.post('/sizes', sizeController.createSize);
router.put('/sizes/:id', sizeController.updateSize);
router.delete('/sizes/:id', sizeController.deleteSize);

module.exports = router;