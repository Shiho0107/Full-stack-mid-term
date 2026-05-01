import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const PostController = {
  create: async (req, res) => {
    try {
      const { userId, content } = req.body;

      if (!userId || !content) {
        return res.status(400).json({
          message: "Missing required fields: userId, content",
        });
      }

      if (userId !== req.userId) {
        return res.status(403).json({ message: "Forbidden - userId mismatch" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const post = await Post.create({
        userId,
        content,
      });

      res.status(201).json({
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({
          message: "Missing required field: content",
        });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid post id" });
      }

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.userId !== req.userId) {
        return res
          .status(403)
          .json({ message: "Forbidden - You can only update your own posts" });
      }

      post.content = content;
      post.updateAt = Date.now();
      await post.save();

      res.json({
        message: "Post updated successfully",
        post,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
