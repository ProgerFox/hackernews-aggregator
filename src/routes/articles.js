const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

/**
 * @swagger
 * tags:
 *   - name: Articles
 *     description: Article management and retrieval
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles with pagination
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of articles per page
 *     responses:
 *       "200":
 *         description: Articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       "400":
 *         description: Invalid input
 *       "500":
 *         description: Internal server error
 */
router.get("/", articleController.getAllArticles);

/**
 * @swagger
 * /articles/top:
 *   get:
 *     summary: Get top articles sorted by points
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of top articles to retrieve
 *     responses:
 *       "200":
 *         description: Top articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       "500":
 *         description: Internal server error
 */
router.get("/top", articleController.getTopArticles);

/**
 * @swagger
 * /articles/search:
 *   get:
 *     summary: Search articles by query
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of articles to retrieve
 *     responses:
 *       "200":
 *         description: Articles matching the query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       "400":
 *         description: Query parameter is required
 *       "500":
 *         description: Internal server error
 */
router.get("/search", articleController.searchArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       "200":
 *         description: Article retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       "404":
 *         description: Article not found
 *       "500":
 *         description: Internal server error
 */
router.get("/:id", articleController.getArticleById);

module.exports = router;
