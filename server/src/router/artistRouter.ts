import { Router } from "express";
import {
  createArtist,
  createArtistMusic,
  deleteArtistById,
  deleteArtistMusic,
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

artistRouter.post("/music/create", createArtistMusic);
artistRouter.put("/music/update", updateArtistMusic);
artistRouter.get("/music/get-all/:id", getArtistMusics);
artistRouter.delete("/music/delete/:id", deleteArtistMusic);

export default artistRouter;
