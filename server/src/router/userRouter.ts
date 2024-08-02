import { Router } from "express";
import { createUser } from "../controller/usercontroller";

const userRouter = Router();

userRouter.post("/register", createUser);

export default userRouter;
