import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    comments_count: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    fetched_at: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Index for efficient queries
articleSchema.index({ created_at: -1 });
articleSchema.index({ points: -1 });
articleSchema.index({ author: 1 });

export default mongoose.model("Article", articleSchema);
