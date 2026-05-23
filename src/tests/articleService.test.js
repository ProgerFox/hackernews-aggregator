const mongoose = require("mongoose");
const Article = require("../models/Article");
const articleService = require("../services/articleService");

describe("Article Service", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb://admin:password@localhost:27017/hackernews?authSource=admin",
    );
  }, 10000);

  afterEach(async () => {
    await Article.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  }, 10000);

  test("should save articles to database", async () => {
    const articles = [
      {
        title: "Test Article 1",
        url: "https://example.com/test1",
        author: "testuser1",
        points: 100,
        comments_count: 10,
      },
      {
        title: "Test Article 2",
        url: "https://example.com/test2",
        author: "testuser2",
        points: 200,
        comments_count: 20,
      },
    ];

    const savedArticles = await articleService.saveArticles(articles);

    expect(savedArticles).toHaveLength(2);
    expect(savedArticles[0].title).toBe("Test Article 1");
    expect(savedArticles[1].title).toBe("Test Article 2");
  });

  test("should get articles from database", async () => {
    const result = await articleService.getArticles();

    expect(result.articles).toBeDefined();
    expect(result.pagination).toBeDefined();
  });

  test("should get article by ID", async () => {
    const articles = [
      {
        title: "Test Article 3",
        url: "https://example.com/test3",
        author: "testuser3",
        points: 150,
      },
    ];

    const savedArticles = await articleService.saveArticles(articles);
    const articleId = savedArticles[0]._id;

    const article = await articleService.getArticleById(articleId);

    expect(article).toBeDefined();
    expect(article.title).toBe("Test Article 3");
  });
});
