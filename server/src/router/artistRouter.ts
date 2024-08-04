import { Router } from "express";
import {
  createArtist,
  deleteArtistById,
  getArtists,
  updateArtist,
} from "../controller/artistController";

const artistRouter = Router();

artistRouter.post("/create", createArtist);
artistRouter.put("/update", updateArtist);
artistRouter.delete("/delete/:id", deleteArtistById);
artistRouter.get("/get-all", getArtists);

export default artistRouter;
