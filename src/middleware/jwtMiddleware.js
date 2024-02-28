// middleware/jwtMiddleware.js

import { verifyToken } from "../utils/jwtUtils";

export function verifyJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res?.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
