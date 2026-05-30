import articleService from "../services/articleService.js";

const getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    if (page < 1) {
      return res.status(400).json({ message: "Page must be greater than 0" });
    }

    if (limit < 1 || limit > 100) {
      return res
        .status(400)
        .json({ message: "Limit must be between 1 and 100" });
    }

    const { articles, pagination } = await articleService.getArticles(
      {},
      { page, limit },
    );

    res.json({
      articles,
      pagination,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopArticles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const { articles } = await articleService.getArticles(
      {},
      { limit, sortBy: "-points" },
    );

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchArticles = async (req, res) => {
  try {
    const query = req.query.q;
    const limit = parseInt(req.query.limit) || 20;

    if (!query) {
      return res
        .status(400)
        .json({ message: 'Query parameter "q" is required' });
    }

    const articles = await articleService.searchArticles(query, limit);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await articleService.getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postArticle = async (req, res) => {
  try {
    const { id } = await articleService.addArticle(req.body);

    res.status(201).json({ message: id });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    await articleService.deleteArticleById(req.params.id);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const articleController = {
  getAllArticles,
  getTopArticles,
  searchArticles,
  getArticleById,
  postArticle,
  deleteArticleById,
};

export default articleController;
