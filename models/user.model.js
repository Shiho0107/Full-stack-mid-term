import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    apiKey: { type: String },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
