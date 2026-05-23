const hackerNewsService = require("./hackerNewsService");
const articleService = require("./articleService");

exports.fetchLatestArticles = async (limit = 30) => {
  try {
    console.log("Fetching latest articles from HackerNews...");

    const storyIds = await hackerNewsService.getTopStoryIds();

    const stories = await hackerNewsService.getItemsByIds(storyIds, limit);

    const articles = stories
      .map((story) => ({
        title: story.title,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        author: story.by || "unknown",
        points: story.score || 0,
        comments_count: story.descendants || 0,
        created_at: story.time ? new Date(story.time * 1000) : new Date(),
        tags: ["hackernews"],
      }))
      .filter((article) => article.title && article.url);

    const savedArticles = await articleService.saveArticles(articles);

    console.log(
      `Successfully fetched and saved ${savedArticles.length} articles`,
    );
    return savedArticles;
  } catch (error) {
    console.error("Error fetching articles:", error.message);
    throw error;
  }
};

exports.initialize = async () => {
  try {
    await exports.fetchLatestArticles(50);
    console.log("Initial data fetch completed");
  } catch (error) {
    console.error("Error during initial data fetch:", error.message);
  }
};
