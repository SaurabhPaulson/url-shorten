const db = require('../models/db');
const crypto = require('crypto');
const cache = require('../services/cache');

function generateShortAlias() {
    return crypto.randomBytes(4).toString('hex'); // Generates a random 8-character hexadecimal string
}

exports.createShortUrl = async (req, res) => {
    const { longUrl, customAlias, topic } = req.body;
    console.log('Request body:', req.body);

    try {
        // If a custom alias is provided, use it, otherwise generate a random alias
        const shortAlias = customAlias || generateShortAlias();

        // Save the new URL and its alias into the database
        const url = await db.one(
            'INSERT INTO urls (long_url, short_alias, topic) VALUES ($1, $2, $3) RETURNING *',
            [longUrl, shortAlias, topic]
        );

        res.status(200).json({
            shortUrl: `${req.protocol}://${req.get('host')}/${url.short_alias}`,
            createdAt: url.created_at,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating short URL' });
    }
};


exports.redirectToLongUrl = async (req, res) => {
    const { alias } = req.params;

    try {
        // Check cache
        let longUrl = await cache.get(alias);

        if (!longUrl) {
            const url = await db.oneOrNone('SELECT long_url FROM urls WHERE short_alias = $1', [alias]);

            if (!url) {
                return res.status(404).json({ message: 'URL not found' });
            }

            longUrl = url.long_url;

            // Cache the result
            await cache.set(alias, longUrl);
        }

        res.redirect(longUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during redirection' });
    }
};

