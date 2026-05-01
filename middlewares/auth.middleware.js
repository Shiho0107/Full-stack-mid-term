import { User } from "../models/user.model.js";

export const AuthMiddleware = {
  validateApiKey: async (req, res, next) => {
    try {
      const apiKey = req.query.apiKey;

      if (!apiKey) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Missing apiKey" });
      }

      const user = await User.findOne({ apiKey });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid apiKey" });
      }

      req.userId = user._id.toString();
      req.email = user.email;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
