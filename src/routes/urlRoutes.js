const express = require('express');
const { createShortUrl, redirectToLongUrl } = require('../controllers/urlController');
const { createShortUrlLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/shorten-url', createShortUrl);
router.get('/shorten/:alias', redirectToLongUrl);
router.post('/shorten', createShortUrlLimiter, createShortUrl);


module.exports = router;
