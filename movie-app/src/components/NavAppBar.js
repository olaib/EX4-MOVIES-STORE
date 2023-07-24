import { Navbar, Nav, Badge, Form, InputGroup, Button } from 'react-bootstrap';
import { useState } from 'react';

const NavAppBar = (props) => {
    const toggleCart = () => {
        props.setShowCart(!props.showCart);
    };

    return (
        <Navbar
            expand="md"
            style={{ fontFamily: 'monospace' }}
            className="sticky-top border-bottom shadow-sm rounded border bg-light border-light shadow-lg p-3 rounded-6"
        >
            <Navbar.Brand href="/" className="d-flex align-items-center rounded-3 bg-gradient p-2 shadow-lg mr-2">
                <i className="fas fa-film" />&nbsp;
                Popcornflix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="">
                    <Nav.Link href="/movies">
                        <i className="fas fa-film fa-lg" />
                        <Badge pill bg="secondary" className="ml-1">
                            Movies
                        </Badge>
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link href="#" title={`Shopping Cart`} onClick={toggleCart} id="cart">
                        <i className={'fas fa-shopping-cart fa-lg'} />
                        <Badge pill bg="secondary" className="ml-1">
                            {props.items ?? 0}
                        </Badge>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavAppBar;
