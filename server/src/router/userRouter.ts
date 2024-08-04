import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from "../controller/userController";

const userRouter = Router();

userRouter.post("/create", createUser);
userRouter.put("/update", updateUserById);
userRouter.delete("/delete/:id", deleteUserById);
userRouter.get("/get-all", getUsers);

export default userRouter;
