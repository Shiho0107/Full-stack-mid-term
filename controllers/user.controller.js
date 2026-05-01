import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const generateRandomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const userController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;

      if (!userName || !email || !password) {
        return res.status(400).json({
          message: "Missing required fields: userName, email, password",
        });
      }

      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        salt: salt.toString(),
      });

      res.status(201).json({
        message: "User registered successfully",
        userId: user._id,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Missing required fields: email, password",
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(password, user.salt);
      const isPasswordValid = hashedPassword === user.password;

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" });
      }

      const randomString = generateRandomString();
      const apiKey = `mern-$${user._id}$-$${email}$-$${randomString}$`;

      user.apiKey = apiKey;
      await user.save();

      res.json({
        message: "Login successful",
        apiKey,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
