const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// GET /api/articles - Get all articles with pagination
router.get("/", articleController.getAllArticles);

// GET /api/articles/top - Get top articles by points
router.get("/top", articleController.getTopArticles);

// GET /api/articles/search - Search articles by query
router.get("/search", articleController.searchArticles);

// GET /api/articles/:id - Get a specific article by ID
router.get("/:id", articleController.getArticleById);

module.exports = router;
