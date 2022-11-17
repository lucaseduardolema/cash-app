import React, { useState, useEffect }  from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../images/bank-icon.png";
import { getBalance, setToken } from "../services/requests";

export default function Header() {
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const token = JSON.parse(localStorage.getItem("access_token"));
      setToken(token);
      const { balance } = await getBalance("/account");
      setUserBalance(balance);
    })();
  });
  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >
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
