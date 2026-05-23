const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HackerNews Aggregator API",
      version: "1.0.0",
      description: "A REST API for aggregating HackerNews articles",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Article: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Article ID",
            },
            title: {
              type: "string",
              description: "Article title",
            },
            url: {
              type: "string",
              description: "Article URL",
            },
            author: {
              type: "string",
              description: "Article author",
            },
            points: {
              type: "number",
              description: "Article points/karma",
            },
            comments_count: {
              type: "number",
              description: "Number of comments",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Article creation timestamp",
            },
            fetched_at: {
              type: "string",
              format: "date-time",
              description: "Article fetch timestamp",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Article tags",
            },
            __v: {
              type: "number",
              description: "MongoDB version key",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
