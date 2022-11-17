import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../components/Header";
import { setToken, transfer } from "../services/requests";

export default function DashBoard() {
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");

  const handleUsername = ({ target: { value } }) => setUsername(value);
  const handleValue = ({ target: { value } }) => setValue(value);
  const handleTransfer = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token"));
      setToken(token);
      const { message } = await transfer("/transaction", { username, value });
      alert(message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1>NG Cash</h1>

        <div>
          <h2>Faça uma transferência</h2>
          <Form>
            <Form.Group className="my-5" controlId="transfer-form-username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsername}
              />
              <Form.Text className="text-muted">
                Insira o Username do destinatário
              </Form.Text>
            </Form.Group>

            <Form.Group className="my-5" controlId="transfer-form-value">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Value"
                value={value}
                onChange={handleValue}
              />
              <Form.Text className="text-muted">
                Insira o Valor que deseja transferir
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleTransfer}>
              Transferir
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}
