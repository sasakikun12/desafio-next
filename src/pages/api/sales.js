import pool from "@/database";
import { verifyJWT } from "../../middleware/jwtMiddleware";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { name, description, value, quantity, type, userId } = req.body;
    const link = req.body.link;
    const client = await pool.connect();

    await client.query(
      "INSERT INTO products(name, userId, description, value, quantity, type, link) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, userId, description, value, quantity, type, link]
    );
    const products = { name, description, value, quantity, type, userId, link };
    client.release();
    return res.status(201).json({
      products,
    });
  } catch (error) {
    console.error("Error executing query", error);
    return res.status(422).json({
      error: error.message,
      message: "Failed to get all products",
    });
  }
}

export default function (req, res) {
  verifyJWT(req, res, () => handler(req, res));
}
