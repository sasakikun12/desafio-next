import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import styled from "styled-components";
import { signIn } from "@/resources/users";
import LoginImage from "@/assets/login.svg";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

const StyledLogin = styled.div`
  img {
    position: relative !important;
  }
`;

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn({ username, password })
      .then((response) => {
        Cookies.set("token", response.data.token);
        Cookies.set("username", username);
        Cookies.set("userId", response.data.userId);
        toast.success(`Bem vindo ${username}`);
        router.push("/home");
      })
      .catch(() => {
        toast.error("Usuário ou senha incorretos!");
      });
  };

  return (
    <Container fluid className="d-flex flex-row h-100 justify-content-between">
      <Row>
        <Col className="d-flex align-items-center container">
          <StyledLogin>
            <Image src={LoginImage} fill={true} alt="Login" />
          </StyledLogin>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center p-5">
          <h1>Login</h1>
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
            <button type="submit">Entrar</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
