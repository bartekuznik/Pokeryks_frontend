import React, { useContext } from "react";
import NavBarr from "./components/NavBarr";
import "./App.css";
import Button from "react-bootstrap/Button";
import { UserContext } from "./UserContext"; // Import UserContext

const Shop = () => {
  const { userData, setUserData } = useContext(UserContext); // Use UserContext

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
          username: userData.username, // Use username from userData
          vip: "1", // Assuming '1' indicates VIP status
          endpoint: "", // Any additional data required by your server
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setUserData({ ...userData, vip: 1 }); // Update userData with new VIP status
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
                endpoint: "", // Any additional data required by your server
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setUserData({ ...userData, money: data.money }); // Update userData with the new token amount from the response
            alert(`${amount} Tokens Purchase successful!`);
        } else {
            // Handle different types of errors based on your API's response structure
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
