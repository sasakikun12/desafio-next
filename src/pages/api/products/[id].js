import pool from "@/database";
import { verifyJWT } from "@/middleware/jwtMiddleware";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      const client = await pool.connect();

      const result = await client.query("DELETE FROM products WHERE id = $1", [
        id,
      ]);

      client.release();

      if (result.rowCount === 0) {
        return res.status(404).json({
          error: error.message,
          message: "Produto não encontrado!",
        });
      }
      return res.status(201).json({
        message: "Produto removido com sucesso!",
      });
    } catch (error) {
      console.error("Error executing query", error);
      return res.status(422).json({
        error: error.message,
        message: "Erro ao remover o produto!",
      });
    }
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}

export default function (req, res) {
  verifyJWT(req, res, () => handler(req, res));
}
