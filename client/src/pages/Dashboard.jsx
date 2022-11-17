import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../components/Header";
import { setToken, transactions, transfer } from "../services/requests";

export default function DashBoard() {
  const [username, setUsername] = useState("");
  const [value, setValue] = useState("");
  const [userTransactions, setTransactions] = useState([])

  const endpoint = "/transaction"
  const token = JSON.parse(localStorage.getItem("access_token"));
  setToken(token);

  const handleUsername = ({ target: { value } }) => setUsername(value);
  const handleValue = ({ target: { value } }) => setValue(value);

  const handleTransfer = async () => {
    try {
      const { message } = await transfer(endpoint, { username, value });
      alert(message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const showTransactions = async () => {
    try {
      const data = await transactions(endpoint)
      setTransactions(data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }

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

        <div>
          <h2>Visualizar trasnferencias</h2>

          <Button variant="danger" type="button" onClick={showTransactions}>Extrato</Button>
          
          { userTransactions && userTransactions.map(({id, createdAt, value, creditedAccoundId, debitedAccountId}) => (
            <div key={id}>
              <p>Data de transferência: {new Date(createdAt).toLocaleString()}</p>
              <p>Valor envolvido: {value}</p>
              <p>Conta debitada: {debitedAccountId}</p>
              <p>Conta creditada: {creditedAccoundId}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
