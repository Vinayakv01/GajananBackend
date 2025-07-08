const express = require('express');
const router = express.Router();
const itemStatusController = require('../../controllers/master/ItemStatusController');

router.get('/itemstatus', itemStatusController.getItemStatuses);

module.exports = router;