import React, { useContext } from "react";
import NavBarr from "./components/NavBarr";
import "./App.css";
import Button from "react-bootstrap/Button";
import { UserContext } from "./UserContext";

const Shop = () => {
  const { userData, setUserData } = useContext(UserContext); 
  const handleVipPurchase = async () => {
    if (!userData) {
      alert("You must be logged in to make a purchase.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8001/update_vip/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username, 
          vip: "1",
          endpoint: "", 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({ ...userData, vip: 1 }); 
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
    if (!userData) {
        alert("You must be logged in to make a purchase.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8001/purchase_tokens/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userData.username,
                tokens: amount,
                endpoint: "", 
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setUserData({ ...userData, money: data.money }); 
            alert(`${amount} Tokens Purchase successful!`);
        } else {
            const errorMessage = data.detail || "An error occurred during the purchase.";
            alert("Tokens Purchase failed: " + errorMessage);
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
          <p>VIP Status: {userData && userData.vip ? "Active" : "Inactive"}</p>
          <p>Tokens: {userData ? userData.money : 0}</p>
          {userData ? (
            <>
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
            </>
          ) : (
            <p>Please log in or register to make a purchase.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
