import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import styled from "styled-components";
import { signIn } from "@/resources/users";
import LoginImage from "@/assets/login.svg";
import Image from "next/image";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const StyledImage = styled.div`
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
    <Container fluid className="d-flex flex-row h-100 justify-content-center">
      <Row>
        <Col className="d-flex align-items-center container">
          <StyledImage>
            <Image src={LoginImage} fill={true} alt="Login" />
          </StyledImage>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className="mb-4">Entrar</h1>
          <Form onSubmit={handleSubmit}>
            <div>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="mt-4" type="submit">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
