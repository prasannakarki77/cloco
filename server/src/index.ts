import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
