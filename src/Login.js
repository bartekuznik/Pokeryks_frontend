import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBarr from './components/NavBarr';
import Card from 'react-bootstrap/Card';
import './App.css';

export default function Login (){
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = { email, password };
        console.log(JSON.stringify(data))
        fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(response.json());
        }, (error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <NavBarr/>
            <div className='form--div'>
                <Card style={{ width: '22rem' }}>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPasword(e.target.value)}/>
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
}


