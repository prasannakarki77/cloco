import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from "../controller/userController";

const userRouter = Router();

userRouter.post("/create", createUser);
userRouter.patch("/update/:id", updateUserById);
userRouter.delete("/delete/:id", deleteUserById);
userRouter.get("/get-all", getUsers);

export default userRouter;
