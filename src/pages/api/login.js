import bcrypt from "bcrypt";
import pool from "@/database";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  try {
    const client = await pool.connect();

    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "Senha inválida!" });
    }

    client.release();
    res.json({ token: user.token, userId: user.id });
  } catch (error) {
    console.error("Error executing query", error);
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
}
