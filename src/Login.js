import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBarr from './components/NavBarr';
import Card from 'react-bootstrap/Card';
import './App.css';

export default function Login (){
    return (
        <div>
            <NavBarr/>
            <div className='form--div'>
                <Card style={{ width: '22rem' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
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
