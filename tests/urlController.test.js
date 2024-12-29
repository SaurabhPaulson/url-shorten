const request = require('supertest');
const app = require('../src/app'); // Ensure this is the entry point of your app

describe('POST /api/shorten', () => {
    it('should create a short URL', async () => {
        const response = await request(app)
            .post('/api/shorten')
            .send({
                longUrl: 'https://example.com',
                customAlias: 'exampleAlias',
                topic: 'test',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('shortUrl');
    });

    it('should return a validation error if no URL is provided', async () => {
        const response = await request(app).post('/api/shorten').send({});
        expect(response.status).toBe(400);
    });
});
