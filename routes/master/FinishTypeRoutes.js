const express = require('express');
const router = express.Router();
const finishTypeController = require('../../controllers/master/FinishTypeController');

router.get('/finishtypes', finishTypeController.getFinishTypes);
router.post('/finishtypes', finishTypeController.createFinishType);
router.put('/finishtypes/:id', finishTypeController.updateFinishType);
router.delete('/finishtypes/:id', finishTypeController.deleteFinishType);

module.exports = router;