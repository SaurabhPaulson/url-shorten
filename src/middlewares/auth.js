const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/db');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await db.oneOrNone('SELECT * FROM usersData WHERE google_id = $1', [profile.id]);

                // If not, create a new user
                if (!user) {
                    user = await db.one(
                        'INSERT INTO usersData (google_id, email) VALUES ($1, $2) RETURNING *',
                        [profile.id, profile.emails[0].value]
                    );
                }

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// Serialize and deserialize user for session handling
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.one('SELECT * FROM usersData WHERE id = $1', [id]);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
