import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBarr from "./components/NavBarr";
import Card from "react-bootstrap/Card";
import "./App.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email, username, password };

    try {
      const response = await fetch("http://127.0.0.1:8001/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setUserData(responseData);
        navigate("/");
      } else {
        alert(
          "Registration failed: " + (responseData.detail || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div>
      <NavBarr />
      <div className="form--div">
        <Card style={{ width: "22rem" }}>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="secondary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
