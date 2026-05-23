# HackerNews Aggregator API Documentation

## Base URL

```
http://localhost:3000/api
```

## Swagger docs

```
http://localhost:3000/api/api-docs
```

## Endpoints

### Get All Articles

```
GET /articles
```

**Query Parameters:**

- `page` (integer, optional) - Page number (default: 1)
- `limit` (integer, optional) - Number of articles per page (default: 20)

**Response:**

```json
{
  "articles": [
    {
      "_id": "string",
      "title": "string",
      "url": "string",
      "author": "string",
      "points": "number",
      "comments_count": "number",
      "created_at": "date",
      "fetched_at": "date",
      "tags": ["string"]
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### Get Top Articles

```
GET /articles/top
```

**Query Parameters:**

- `limit` (integer, optional) - Number of articles to return (default: 10)

**Response:**

```json
[
  {
    "_id": "string",
    "title": "string",
    "url": "string",
    "author": "string",
    "points": "number",
    "comments_count": "number",
    "created_at": "date",
    "fetched_at": "date",
    "tags": ["string"]
  }
]
```

### Search Articles

```
GET /articles/search
```

**Query Parameters:**

- `q` (string, required) - Search query
- `limit` (integer, optional) - Number of articles to return (default: 20)

**Response:**

```json
[
  {
    "_id": "string",
    "title": "string",
    "url": "string",
    "author": "string",
    "points": "number",
    "comments_count": "number",
    "created_at": "date",
    "fetched_at": "date",
    "tags": ["string"]
  }
]
```

### Get Article by ID

```
GET /articles/:id
```

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "url": "string",
  "author": "string",
  "points": "number",
  "comments_count": "number",
  "created_at": "date",
  "fetched_at": "date",
  "tags": ["string"]
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**

```json
{
  "message": "Error description"
}
```

**404 Not Found**

```json
{
  "message": "Article not found"
}
```

**500 Internal Server Error**

```json
{
  "message": "Error description"
}
```

## Usage Examples

### Get the latest 10 articles

```bash
curl http://localhost:3000/api/articles?limit=10
```

### Search for articles about JavaScript

```bash
curl http://localhost:3000/api/articles/search?q=javascript
```

### Get top 5 articles

```bash
curl http://localhost:3000/api/articles/top?limit=5
```
