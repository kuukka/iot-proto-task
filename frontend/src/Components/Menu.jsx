import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import useToken from '../Auth/useToken';
import useUsername from '../Auth/useUsername';

const Menu = () => {

    const {token} = useToken();
    const {username} = useUsername();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>YAIOT</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <LinkContainer to='/'>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/link'>
                    <Nav.Link>Link</Nav.Link>
                </LinkContainer>                
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">                
                    <LinkContainer to='/action'>
                        <NavDropdown.Item>Action</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/#action/3.2'>
                        <NavDropdown.Item>Another action</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/#action/3.3'>
                        <NavDropdown.Item>Something</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to='/#action/3.4'>
                        <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Nav>
            {token && 
                <Nav className="">           
                    <NavDropdown title={username ?? "user"} id="nav-dropdown-user">
                        <LinkContainer to='/logout'>
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>        
    )
}

export default Menu;