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

const articleRoutes = require("./routes/articles");

app.use("/api/articles", articleRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "HackerNews Aggregator API",
    version: "1.0.0",
  });
});

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://admin:password@localhost:27017/hackernews?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
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
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
