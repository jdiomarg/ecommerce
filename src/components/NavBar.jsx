import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';


const NavBar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }

    const token = localStorage.getItem("token");

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/#/">Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/">Home</Nav.Link>
                            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                            {
                                token ? (
                                    <Nav.Link as={Button} onClick={logout}>Logout</Nav.Link>
                                ) : (
                                    <Nav.Link href="/#/login">Login</Nav.Link>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link as={Button} onClick={handleShow}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg></Nav.Link>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleShow={handleShow} handleClose={handleClose} />
        </>
    );
};

export default NavBar;