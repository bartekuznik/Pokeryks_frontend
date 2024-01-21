import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBarr from './components/NavBarr';
import Card from 'react-bootstrap/Card';
import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        const loginRequest = {
            email,
            password,
            endpoint: '', 
        };

        try {
            const response = await fetch('http://127.0.0.1:8001/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginRequest),
            });

            if (response.ok) {
                const loginResponse = await response.json();
                console.log(loginResponse)
                setUserData(loginResponse); 
                alert(`Successful login!`);
                navigate('/');
            } else {
                alert(`Login failed!`);
                console.error('Login failed:', response);
            }
        } catch (error) {
            alert(`LError during login!`);
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <NavBarr/>
            <div className='form--div'>
                <Card style={{ width: '22rem' }}>
                    <Card.Body>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="secondary" type="submit">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card> 
            </div>
        </div>
    );
};

export default Login;
