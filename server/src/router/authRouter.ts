import { Router } from "express";
import { registerUser, loginUser } from "../controller/authController";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
