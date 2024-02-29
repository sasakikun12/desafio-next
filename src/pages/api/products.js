import pool from "@/database";
import { verifyJWT } from "../../middleware/jwtMiddleware";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, value, quantity, type, userId } = req.body;
      const link = req.body.link;
      const client = await pool.connect();

      await client.query(
        "INSERT INTO products(name, userId, description, value, quantity, type, link) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [name, userId, description, value, quantity, type, link]
      );

      const result = await client.query(
        "SELECT id FROM products WHERE name = $1",
        [name]
      );

      const productId = result.rows[0].id;

      const products = {
        id: productId,
        name,
        description,
        value,
        quantity,
        type,
        userId,
        link,
      };

      client.release();
      return res.status(201).json({
        products,
      });
    } catch (error) {
      console.error("Error executing query", error);
      return res.status(422).json({
        error: error.message,
        message: "Falha ao inserir o produto!",
      });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, description, value, quantity, type, userId } = req.body;
      const link = req.body.link;
      const client = await pool.connect();

      await client.query(
        "UPDATE products SET value = $1, quantity = $2, type = $3, description = $4, link = $5 WHERE id = $6 AND userId = $7",
        [value, quantity, type, description, link, id, userId]
      );

      const result = await client.query(
        "SELECT name FROM products WHERE id = $1",
        [id]
      );

      const productName = result.rows[0].name;

      const products = {
        id,
        name: productName,
        description,
        value,
        quantity,
        type,
        userId,
        link,
      };

      client.release();
      return res.status(201).json({
        products,
      });
    } catch (error) {
      console.error("Error executing query", error);
      return res.status(422).json({
        error: error.message,
        message: "Falha ao atualizar o produto!",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.params;

      const client = await pool.connect();

      await client.query("DELETE FROM products WHERE id = $1", [id]);

      await client.query("SELECT name FROM products WHERE id = $1", [id]);

      client.release();
      return res.status(201).json({
        message: "Produto removido com sucesso!",
      });
    } catch (error) {
      console.error("Error executing query", error);
      return res.status(422).json({
        error: error.message,
        message: "Produto removido com sucesso!",
      });
    }
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}

export default function (req, res) {
  verifyJWT(req, res, () => handler(req, res));
}
