const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const articles = await Article.find()
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments();

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopArticles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const articles = await Article.find()
      .sort({ points: -1 })
      .limit(limit);
      
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchArticles = async (req, res) => {
  try {
    const query = req.query.q;
    const limit = parseInt(req.query.limit) || 20;
    
    if (!query) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    })
    .sort({ created_at: -1 })
    .limit(limit);
    
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};