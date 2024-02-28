import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import styled from "styled-components";
import Image from "next/image";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { createUser } from "@/resources/users";
import { useRouter } from "next/router";
import SignUpImage from "@/assets/signup.svg";

const StyledImage = styled.div`
  img {
    position: relative !important;
  }
`;

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
    <Container fluid className="d-flex flex-row h-100 justify-content-center">
      <Row>
        <Col className="d-flex align-items-center container">
          <StyledImage>
            <Image src={SignUpImage} fill={true} alt="Login" />
          </StyledImage>
        </Col>
        <Col className="d-flex flex-column align-items-center justify-content-center p-5">
          <h1 className="mb-4">Cadastrar</h1>
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
