import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router
import axios from "axios";
import NavBarr from "./components/NavBarr";
import { UserContext } from "./UserContext"; // Import your UserContext
import "./App.css"; // Make sure this import is here to apply your styles

const ChooseServerScreen = () => {
  const [servers, setServers] = useState([]);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get("http://localhost:8002/status/");
        setServers(response.data);
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();
  }, []);

  const handleServerClick = (server) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      selectedServer: server,
    }));
    navigate("/game"); // Adjust this to your Play.js route
  };

  return (
    <div>
      <NavBarr />
      <div className="server-list-container">
        {" "}
        {/* Use the new CSS class here */}
        {servers.map((server, index) => (
          <div
            key={index}
            className="server-item" // Use the new CSS class for server items
            onClick={() => handleServerClick(server)}
          >
            IP: {server.ip} - Occupancy: {server.occupation}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseServerScreen;
