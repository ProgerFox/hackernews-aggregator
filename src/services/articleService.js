const Article = require("../models/Article");

/**
 * Save articles to the database
 * @param {Array} articles - Array of article objects to save
 * @returns {Promise<Array>} Array of saved articles
 */
exports.saveArticles = async (articles) => {
  try {
    const savedArticles = [];
    
    for (const articleData of articles) {
      if (!articleData || !articleData.title || !articleData.url) {
        continue;
      }
      
      const article = await Article.findOneAndUpdate(
        { url: articleData.url },
        {
          ...articleData,
          fetched_at: new Date(),
        },
        {
          new: true, 
          upsert: true,
          runValidators: true,
        },
      );
      
      savedArticles.push(article);
    }
    
    return savedArticles;
  } catch (error) {
    throw new Error(`Failed to save articles: ${error.message}`);
  }
};

/**
 * Get articles from the database with filtering and pagination
 * @param {Object} filter - MongoDB filter object
 * @param {Object} options - Options for pagination and sorting
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Number of articles per page (default: 20)
 * @param {string} options.sortBy - Sort field (default: '-created_at')
 * @returns {Promise<Object>} Object containing articles and pagination info
 */
exports.getArticles = async (filter = {}, options = {}) => {
  try {
    const { page = 1, limit = 20, sortBy = "-created_at" } = options;
    const skip = (page - 1) * limit;
    
    const articles = await Article.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
      
    const total = await Article.countDocuments(filter);
    
    return {
      articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error(`Failed to get articles: ${error.message}`);
  }
};

/**
 * Get an article by its ID
 * @param {string} id - Article ID
 * @returns {Promise<Object|null>} Article object or null if not found
 */
exports.getArticleById = async (id) => {
  try {
    const article = await Article.findById(id);
    return article;
  } catch (error) {
    throw new Error(`Failed to get article: ${error.message}`);
  }
};

/**
 * Search articles by query
 * @param {Object} params - Search parameters
 * @param {string} params.query - Search query
 * @param {number} params.limit - Number of articles to return (default: 20)
 * @returns {Promise<Array>} Array of matching articles
 */
exports.searchArticles = async ({ query, limit = 20 }) => {
  try {
    // Create a more efficient search using text index if available
    // Fallback to regex search for compatibility
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    })
      .sort({ created_at: -1 })
      .limit(limit);

    return articles;
  } catch (error) {
    throw new Error(`Failed to search articles: ${error.message}`);
  }
};

/**
 * Cleanup old articles from the database
 * @param {number} days - Number of days to keep articles (default: 30)
 * @returns {Promise<number>} Number of deleted articles
 */
exports.cleanupOldArticles = async (days = 30) => {
  try {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    
    const result = await Article.deleteMany({
      created_at: { $lt: dateThreshold },
    });
    
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Failed to cleanup old articles: ${error.message}`);
  }
};
