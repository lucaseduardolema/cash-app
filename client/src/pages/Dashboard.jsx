import React, { useState, useEffect } from "react";
import { getBalance, setToken } from "../services/requests";

export default function DashBoard() {
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
    <div>
      <p>Saldo atual {userBalance}</p>
    </div>
  );
}
