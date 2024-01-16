import React, { useState } from "react";
import NavBarr from "./components/NavBarr";
import "./App.css";
import Button from "react-bootstrap/Button";

const Shop = () => {
  const [vipStatus, setVipStatus] = useState(false);
  const [tokens, setTokens] = useState(0);

  const handleVipPurchase = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8001/update_vip/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "yourUsername", // Replace with actual username
          vip: "1", // Assuming '1' indicates VIP status
          endpoint: "", // Any additional data required by your server
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setVipStatus(true); // Update VIP status
        alert("VIP Purchase successful!");
      } else {
        alert("VIP Purchase failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during VIP purchase:", error);
      alert("VIP Purchase failed: " + error.message);
    }
  };

  const handleTokensPurchase = async (amount) => {
    try {
      const response = await fetch("http://127.0.0.1:8001/purchase_tokens/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "yourUsername", // Replace with actual username
          tokens: amount.toString(),
          endpoint: "", // Any additional data required by your server
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setTokens(tokens + amount); // Update token amount
        alert(`${amount} Tokens Purchase successful!`);
      } else {
        alert("Tokens Purchase failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during tokens purchase:", error);
      alert("Tokens Purchase failed: " + error.message);
    }
  };

  const coinOptions = [50, 100, 500];

  return (
    <div>
      <NavBarr />
      <div className="shop-container">
        <div className="shop-content">
        <h1>Shop</h1>
          <p>Become a VIP or Buy Coins!</p>
          <p>VIP Status: {vipStatus ? "Active" : "Inactive"}</p>
          <p>Tokens: {tokens}</p>
          <Button variant="dark" onClick={handleVipPurchase}>
            Buy VIP
          </Button>
          {coinOptions.map((amount) => (
            <Button
              key={amount}
              variant="dark"
              onClick={() => handleTokensPurchase(amount)}
            >
              Buy {amount} Coins
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
