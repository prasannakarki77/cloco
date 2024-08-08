import csvParser from "csv-parser";
import pool from "../config/db";
import { Request, Response } from "express";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";

export const createArtist = async (req: Request, res: Response) => {
  try {
    const {
      name,
      gender,
      address,
      dob,
      first_year_release,
      no_of_album_released,
    } = req.body;

    const artistExists = await pool.query(
      "SELECT * FROM artists WHERE name = $1",
      [name]
    );

    if (artistExists.rows.length > 0) {
      return res.status(400).json({ error: "Artist already exists" });
    }
    const result = await pool.query(
      `INSERT INTO artists (name, gender, address, dob, first_year_release, no_of_album_released)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
      [name, gender, address, dob, first_year_release, no_of_album_released]
    );
    const newArtist = result.rows[0];
    res.status(201).json(newArtist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create artist" });
  }
};

export const updateArtist = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      gender,
      address,
      dob,
      first_year_release,
      no_of_album_released,
    } = req.body;

    if (!name || !gender || !address || !dob || !id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const artist = await pool.query("SELECT * FROM artists WHERE id = $1", [
      id,
    ]);
    if (artist.rows.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const result = await pool.query(
      `UPDATE artists
         SET name = $1, gender = $2, address = $3, dob = $4, first_year_release = $5, no_of_album_released = $6
         WHERE id = $7
         RETURNING *`,
      [name, gender, address, dob, first_year_release, no_of_album_released, id]
    );

    const updatedArtist = result.rows[0];
    res.status(200).json(updatedArtist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update artist" });
  }
};

export const getArtists = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const offset = (page - 1) * pageSize;

    const artistsQuery = `
      SELECT * FROM artists
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;
    const { rows: artists } = await pool.query(artistsQuery, [
      pageSize,
      offset,
    ]);

    const countQuery = `SELECT COUNT(*) FROM artists`;
    const {
      rows: [{ count }],
    } = await pool.query(countQuery);
    const totalCount = parseInt(count, 10);

    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      data: artists,
      page,
      pageSize,
      totalPages,
      totalCount,
      hasNextPage,
      hasPrevPage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
};

export const getArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Artist ID is required" });
    }

    const { rows: artists } = await pool.query(
      `SELECT * FROM artists WHERE id = $1`,
      [id]
    );

    if (artists.length === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.status(200).json(artists[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch artist" });
  }
};

export const deleteArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Artist ID is required" });
    }
    const result = await pool.query(
      "DELETE FROM artists WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Artist not found" });
    }
    res
      .status(200)
      .json({ message: "Artist deleted successfully", artist: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete artist" });
  }
};

export const createArtistMusic = async (req: Request, res: Response) => {
  try {
    const { artist_id, title, album_name, genre } = req.body;

    const result = await pool.query(
      `INSERT INTO music (artist_id, title, album_name, genre)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
      [artist_id, title, album_name, genre]
    );
    const newRecord = result.rows[0];
    res.status(201).json(newRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create music record" });
  }
};

export const getArtistMusics = async (req: Request, res: Response) => {
  try {
    const artist_id = req.params.id;
    console.log(artist_id);
    const { rows: musics } = await pool.query(
      `SELECT * FROM music WHERE artist_id = $1`,
      [artist_id]
    );

    res.status(200).json({
      musics,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch music records" });
  }
};

export const updateArtistMusic = async (req: Request, res: Response) => {
  try {
    const { id, title, album_name, genre } = req.body;

    if (!id || !title || !album_name || !genre) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const musics = await pool.query("SELECT * FROM music WHERE id = $1", [id]);

    if (musics.rows.length === 0) {
      return res.status(404).json({ error: "Musics not found" });
    }

    const result = await pool.query(
      `UPDATE music
         SET title = $1, album_name = $2, genre = $3
         WHERE id = $4
         RETURNING *`,
      [title, album_name, genre, id]
    );

    const updatedArtist = result.rows[0];
    res.status(200).json(updatedArtist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update music record" });
  }
};

export const deleteArtistMusic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Music Id is required" });
    }
    const result = await pool.query(
      "DELETE FROM music WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Music not found" });
    }
    res.status(200).json({
      message: "Music record deleted successfully",
      artist: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete music" });
  }
};

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
const UPLOADS_DIR = path.join(__dirname, "../../");
export const importArtistsFromCSV = async (
  req: MulterRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const artists: any[] = [];
    const csvFilePath = path.join(UPLOADS_DIR, req.file.path);
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        artists.push(row);
      })
      .on("end", async () => {
        for (const artist of artists) {
          const {
            name,
            gender,
            address,
            dob,
            first_year_release,
            no_of_album_released,
          } = artist;

          const query = `
            INSERT INTO artists (name, gender, address, dob, first_year_release, no_of_album_released)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;
          await pool.query(query, [
            name,
            gender,
            address,
            dob,
            first_year_release,
            no_of_album_released,
          ]);
        }
        res.status(200).json({
          message:
            "CSV file successfully processed and data imported into the artists table.",
        });
      });
  } catch (err) {
    console.error("Error importing CSV:", err);
    res.status(500).json({ error: "Failed to import artists from CSV" });
  }
};

export const exportArtistsToCSV = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM artists";
    const result = await pool.query(query);
    const artists = result.rows;
    const fields = [
      "id",
      "name",
      "gender",
      "address",
      "dob",
      "first_year_release",
      "no_of_album_released",
      "created_at",
      "updated_at",
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(artists);

    const outputFilePath = path.join(__dirname, "exported_artists.csv");
    fs.writeFileSync(outputFilePath, csv);

    res.download(outputFilePath, "artists.csv", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ error: "Failed to export artists to CSV" });
      }
    });
  } catch (err) {
    console.error("Error exporting CSV:", err);
    res.status(500).json({ error: "Failed to export artists to CSV" });
  }
};
