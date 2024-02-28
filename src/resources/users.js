import api from "../services/api";

const signIn = (user) => api.post("/login", user);

const createUser = (user) => api.post("/createUser", user);

export { signIn, createUser };
