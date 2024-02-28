import pool from "@/database";

export default async function handler(req, res) {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT * FROM users");
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
