import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { createUser } from "@/resources/users";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    createUser({ username, password })
      .then((response) => {
        const { token, userId } = response.data.user;
        Cookies.set("token", token);
        Cookies.set("username", username);
        Cookies.set("userId", userId);
        toast.success("Usuário criado com sucesso!");
        router.push("/home");
      })
      .catch(() => {
        toast.error("Não foi possível cadastrar o usuário");
      });
  };

  return (
    <div>
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
