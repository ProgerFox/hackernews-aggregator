const Article = require('../models/Article');

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
          fetched_at: new Date()
        },
        { 
          new: true, 
          upsert: true,
          runValidators: true
        }
      );
      
      savedArticles.push(article);
    }
    
    return savedArticles;
  } catch (error) {
    throw new Error(`Failed to save articles: ${error.message}`);
  }
};

exports.getArticles = async (filter = {}, options = {}) => {
  try {
    const { page = 1, limit = 20, sortBy = '-created_at' } = options;
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
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw new Error(`Failed to get articles: ${error.message}`);
  }
};

exports.getArticleById = async (id) => {
  try {
    const article = await Article.findById(id);
    return article;
  } catch (error) {
    throw new Error(`Failed to get article: ${error.message}`);
  }
};

exports.cleanupOldArticles = async (days = 30) => {
  try {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    
    const result = await Article.deleteMany({
      created_at: { $lt: dateThreshold }
    });
    
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Failed to cleanup old articles: ${error.message}`);
  }
};