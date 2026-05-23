const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

// Swagger
const { specs, swaggerUi } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const articleRoutes = require("./routes/articles");

app.use("/api/articles", articleRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "HackerNews Aggregator API",
    version: "1.0.0",
    docs: "/api-docs",
  });
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://admin:password@localhost:27017/hackernews?authSource=admin",
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    const fetchService = require("./services/fetchService");

    await fetchService.initialize();

    setInterval(
      async () => {
        try {
          await fetchService.fetchLatestArticles(30);
        } catch (error) {
          console.error("Error in periodic fetch:", error.message);
        }
      },
      10 * 60 * 1000,
    ); // 10 minutes
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
