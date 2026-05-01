import express from "express";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/customer.route.js";
import { connectToDb } from "./configs/db.js";
import postRouter from "./routes/post.route.js";

const app = express();
await connectToDb();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
