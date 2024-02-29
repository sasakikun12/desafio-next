import { verifyJWT } from "@/middleware/jwtMiddleware";
import pool from "@/database";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { userId } = req.query;

  try {
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM sales WHERE userId = $1", [
      userId,
    ]);
    const products = result.rows;

    return res.status(201).json({
      products,
    });
  } catch (error) {
    console.error("Error executing query", error);
    return res.status(422).json({
      error: error.message,
      message: "Failed to get all sales",
    });
  }
}

export default function (req, res) {
  verifyJWT(req, res, () => handler(req, res));
}
