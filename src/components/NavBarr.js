import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

export default function NavBarr(){
    return(
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="/">Pokeryks</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                
                <Nav.Link><Link to="/rank">Rank</Link></Nav.Link>
                <Nav.Link><Link to="/about">About</Link></Nav.Link>
                <Nav.Link><Link to="/shop">Shop</Link></Nav.Link>
                <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                <Nav.Link><Link to="/register">Register</Link></Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )   
}
