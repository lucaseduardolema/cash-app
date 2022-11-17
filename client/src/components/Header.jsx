import React, { useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../images/bank-icon.png";
import { getBalance, setToken } from "../services/requests";

export default function Header() {
  const navigate = useNavigate()
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const token = JSON.parse(localStorage.getItem("access_token"));
        setToken(token);
        const { balance } = await getBalance("/account");
        setUserBalance(balance);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        navigate('/')
      }
    })();
  });

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
