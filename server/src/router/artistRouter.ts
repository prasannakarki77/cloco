import { Router } from "express";
import {
  createArtist,
  createArtistMusic,
  deleteArtistById,
  deleteArtistMusic,
  exportArtistsToCSV,
  getArtistById,
  getArtistMusics,
  getArtists,
  importArtistsFromCSV,
  updateArtist,
  updateArtistMusic,
} from "../controller/artistController";
import multer from "multer";

const artistRouter = Router();

const upload = multer({ dest: "uploads/" });

artistRouter.post("/create", createArtist);
artistRouter.put("/update", updateArtist);
artistRouter.delete("/delete/:id", deleteArtistById);
artistRouter.get("/get-all", getArtists);
artistRouter.delete("/get/:id", getArtistById);

artistRouter.post("/music/create", createArtistMusic);
artistRouter.put("/music/update", updateArtistMusic);
artistRouter.get("/music/get-all/:id", getArtistMusics);
artistRouter.delete("/music/delete/:id", deleteArtistMusic);

artistRouter.post("/import-csv", upload.single("file"), importArtistsFromCSV);
artistRouter.get("/export-csv", exportArtistsToCSV);

export default artistRouter;
