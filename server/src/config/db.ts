import { Pool } from "pg";
import { createUsersTable } from "./query-commands";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

// Initialize database setup (if needed)
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    console.log("Connected to database");
    await createUsersTable();
    client.release();
  } catch (err) {
    console.error("Database initialization error", err);
  }
}

initializeDatabase();

export default pool;
