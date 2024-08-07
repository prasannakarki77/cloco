import pool from "./db";

export const createTables = async () => {
  try {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255),
          phone VARCHAR(20),
          gender VARCHAR(10),
          address TEXT,
          dob DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createArtistTableQuery = `
      CREATE TABLE IF NOT EXISTS artists (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       gender VARCHAR(10),
       address TEXT,
       dob DATE,
       first_year_release INT NOT NULL,
       no_of_album_released INT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createMusicTableQuery = `
      CREATE TABLE IF NOT EXISTS music (
          id SERIAL PRIMARY KEY,
          artist_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          album_name VARCHAR(255) NOT NULL,
          genre VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_artist
              FOREIGN KEY(artist_id)
              REFERENCES artists(id)
              ON DELETE CASCADE
      );
    `;

    await pool.query(createUsersTableQuery);
    await pool.query(createArtistTableQuery);
    await pool.query(createMusicTableQuery);

    console.log("All tables created or already exist.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};
