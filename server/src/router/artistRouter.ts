import { Router } from "express";
import {
  createArtist,
  createArtistMusic,
  deleteArtistById,
  getArtistMusics,
  getArtists,
  updateArtist,
  updateArtistMusic,
} from "../controller/artistController";

const artistRouter = Router();

artistRouter.post("/create", createArtist);
artistRouter.put("/update", updateArtist);
artistRouter.delete("/delete/:id", deleteArtistById);
artistRouter.get("/get-all", getArtists);

artistRouter.get("/music/create", createArtistMusic);
artistRouter.get("/music/update", updateArtistMusic);
artistRouter.get("/music/get-all/:id", getArtistMusics);
artistRouter.get("/music/delete/:id", deleteArtistById);

export default artistRouter;
