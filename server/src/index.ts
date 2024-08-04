import express from "express";
import cors from "cors";
import authRouter from "./router/authRouter";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(authRouter);

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
