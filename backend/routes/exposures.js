const express = require('express');
const router = express.Router();
const exposuresController = require('../controllers/exposuresController');

router.get('/', exposuresController.getExposures);
router.post('/', exposuresController.createExposure);
router.get('/today', exposuresController.getTodayExposure);
router.get('/summary', exposuresController.getSummary);
router.delete('/:id', exposuresController.deleteExposure);

module.exports = router; 