# HackerNews Aggregator

A REST API aggregator for HackerNews articles built with Node.js, Express, and MongoDB.

## Features

- Fetches top stories from HackerNews API
- Stores articles in MongoDB for persistence
- Provides RESTful API endpoints for accessing articles
- Automatic periodic updates of latest articles
- Search and filtering capabilities

## Project Structure

```
src/
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API route definitions
├── services/       # Business logic and external API
└── tests/          # Test files
```

## API Endpoints

### Get all articles

```
GET /api/articles
```

Query parameters:

- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of articles per page (default: 20)

### Get top articles

```
GET /api/articles/top
```

Query parameters:

- `limit` (optional): Number of articles to return (default: 10)

### Search articles

```
GET /api/articles/search
```

Query parameters:

- `q` (required): Search query
- `limit` (optional): Number of articles to return (default: 20)

### Get article by ID

```
GET /api/articles/:id
```

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up environment variables in `.env`:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/hackernews
   NODE_ENV=development
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Start the production server:
   ```
   npm start
   ```

## Docker Setup

For easier setup and consistent environments, you can run MongoDB in Docker:

1. Make sure Docker is installed on your system

2. Start MongoDB container:

   ```
   docker-compose up -d
   ```

3. Proceed with normal setup steps

## Dependencies

- express: Web framework
- mongoose: MongoDB object modeling
- axios: HTTP client for API requests
- dotenv: Environment variable management
- cors: Cross-Origin Resource Sharing
- helmet: Security headers
- morgan: HTTP request logging

## Development

- Run tests: `npm test`
- Start development server: `npm run dev`
- Start production server: `npm start`
