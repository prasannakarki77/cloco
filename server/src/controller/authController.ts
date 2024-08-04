import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
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

    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET || "";

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email } as JwtPayload,
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Failed to log in" });
  }
};
