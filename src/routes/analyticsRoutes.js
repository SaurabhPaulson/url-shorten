const express = require('express');
const { getUrlAnalytics } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/:alias', getUrlAnalytics);

module.exports = router;
