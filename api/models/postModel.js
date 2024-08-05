import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: { type: String, default: "" },
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const postModel = mongoose.model("Post", postSchema);
