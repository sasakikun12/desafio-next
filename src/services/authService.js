import { generateToken } from "@/utils/jwtUtils";

export function loginUser(username, password) {
  const token = generateToken({ username });
  return token;
}
