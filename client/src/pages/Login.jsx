import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { requestAuth } from "../services/requests";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = ({ target: { value } }) => setUsername(value);
  const handlePassword = ({ target: { value } }) => setPassword(value);

  const auth = async ({ target: { name } }) => {
    try {
      const endpoint = `/auth/${name}`;
      const { token } = await requestAuth(endpoint, { username, password });

      localStorage.setItem("user_token", JSON.stringify(token));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <div
        className="
        d-flex
        justify-content-center
        flex-column
        align-items-center"
      >
        <Form>
          <Form.Group className="my-5" controlId="login-form-username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsername}
            />
            <Form.Text className="text-muted">
              Insira seu Username para logar
            </Form.Text>
          </Form.Group>

          <Form.Group className="my-5" controlId="login-form-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePassword}
            />
            <Form.Text className="text-muted">
              Insira seu Password para logar
            </Form.Text>
          </Form.Group>
          <div>
            <Button
              variant="primary"
              name="signin"
              type="button"
              onClick={auth}
            >
              Login
            </Button>

            <Button variant="danger" name="signup" type="button" onClick={auth}>
              Signup
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
