import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fetchService from "./services/fetchService.js";
import articleRoutes from "./routes/articles.js";
import { specs, swaggerUi } from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

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

export default app;
