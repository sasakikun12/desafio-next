import { verifyJWT } from "../../middleware/jwtMiddleware";

function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  res.status(200).json({ message: "Access granted!" });
}

export default function (req, res) {
  verifyJWT(req, res, () => handler(req, res));
}
