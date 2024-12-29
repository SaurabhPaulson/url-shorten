const db = require('../models/db');

exports.getUrlAnalytics = async (req, res) => {
    const { alias } = req.params;

    try {
        const analytics = await db.any(
            `SELECT 
                COUNT(*) AS totalClicks, 
                COUNT(DISTINCT ip_address) AS uniqueUsers, 
                to_char(timestamp, 'YYYY-MM-DD') AS date
             FROM url_analytics
             WHERE url_id = (SELECT id FROM urls WHERE short_alias = $1)
             GROUP BY date`,
            [alias]
        );

        res.json({ analytics });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching analytics' });
    }
};
