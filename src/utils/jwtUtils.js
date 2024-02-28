import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_TOKEN;

export function generateToken(payload) {
  return jwt.sign(payload, secretKey);
}

export function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

export function decodeToken(token) {
  return jwt.decode(token);
}
