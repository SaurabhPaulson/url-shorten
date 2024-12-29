const rateLimit = require('express-rate-limit');

const createShortUrlLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 100, // Limit each user to 100 requests per day
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    headers: true,
});

module.exports = { createShortUrlLimiter };
