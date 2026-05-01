export const UserMiddleware = {
  validateRegister: async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields: userName, email, password",
      });
    }
    next();
  },

  validateLogin: async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        message: "Missing required fields: userName, password",
      });
    }
    next();
  },
};
