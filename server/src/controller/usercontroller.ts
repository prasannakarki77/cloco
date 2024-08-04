import pool from "../config/db";
import { User } from "../model/user";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, phone, gender, address, dob } =
      req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone, gender, address, dob)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
      [first_name, last_name, email, phone, gender, address, dob]
    );
    const newUser: User = result.rows[0];
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, gender, address, dob } =
      req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !gender ||
      !address ||
      !dob
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await pool.query(
      `UPDATE users
         SET first_name = $1, last_name = $2, email = $3, phone = $4, gender = $5, address = $6, dob = $7
         WHERE id = $8
         RETURNING *`,
      [first_name, last_name, email, phone, gender, address, dob, id]
    );

    const updatedUser = result.rows[0];
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.status(200).json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
