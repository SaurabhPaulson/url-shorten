# URL Shortener API

A simple URL shortener service where users can create short URLs for long URLs. This project also provides analytics such as the number of clicks, unique users, and click sources (operating system and device).

## Features

- **Create Short URL**: Shorten long URLs and optionally set a custom alias.
- **Redirect to Long URL**: Redirect users to the original long URL when they visit the short URL.
- **Analytics**: Track analytics for each shortened URL including:
  - Total clicks
  - Unique users
  - Clicks by date
  - OS and device type breakdowns
- **Topic-based Analytics**: Fetch analytics for URLs under a specific topic.
- **Authentication**: Google Sign-In for user authentication.
- **Rate Limiting**: Prevent abuse by rate limiting API calls.
- **Caching**: Use Redis for caching to improve performance.

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database to store URLs and analytics
- **Redis**: In-memory data store for caching
- **Google OAuth**: User authentication via Google
- **Jest**: Testing framework
- **Postman**: API testing and development tool

## Requirements

- Node.js >= 16.x
- MongoDB >= 5.x
- Redis (optional for caching)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

```

 ### 2.Install dependencies
    ```bash
    npm install
    ```

### 3. Set env file

PORT=4000
MONGO_URI=mongodb://localhost:27017/shortener
REDIS_URL=redis://localhost:6379
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SESSION_SECRET=your-session-secret

### Run the Application
``` bash
 npm start
 ```

