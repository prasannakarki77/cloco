import { Request, Response } from "express";
import pool from "../config/db";
import { User } from "../model/user";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      gender,
      address,
      dob,
    } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone, gender, address, dob)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone,
        gender,
        address,
        dob,
      ]
    );

    const newUser: User = result.rows[0];
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }

  console.log("first");
};
