import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../images/bank-icon.png";

export default function Header({userBalance}) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <div className="d-flex justify-content-center align-items-center">
              <img src={logo} alt="ng cash" width="40" heigth="40" />
              <div> Seu saldo é de: {userBalance}</div>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
