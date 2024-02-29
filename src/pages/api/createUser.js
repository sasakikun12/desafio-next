import bcrypt from "bcrypt";
import pool from "@/database";
import { generateToken } from "@/utils/jwtUtils";

export default async function createUser(req, res) {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();

    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = generateToken({ username });
      await client.query(
        "INSERT INTO users (username, password, token) VALUES ($1, $2, $3)",
        [username, hashedPassword, token]
      );
      const newResult = await client.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const newUser = newResult.rows[0];

      client.release();

      return res.status(201).json({
        message: "User created successfully!",
        user: { token, userId: newUser.id },
      });
    } else {
      client.release();
      return res.status(422).json({ message: "Username is already in use" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    return res.status(422).json({
      error: error.message,
      message: "Failed to register user",
    });
  }
}
