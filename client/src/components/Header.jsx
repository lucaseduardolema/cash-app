import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../images/bank-icon.png";

export default function Header({ userBalance }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="ng cash" width="40" heigth="40" />
            CASH APP
          </Navbar.Brand>

          <Navbar.Text>Seu saldo é de: {userBalance}</Navbar.Text>

          <Button variant="danger" type="button" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
}
