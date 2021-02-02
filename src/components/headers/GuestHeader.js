import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import "../../css/guestNav.css";

const GuestHeader = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="light"
      className="guest-nav guest-nav-bg"
    >
      <Navbar.Brand id="auth-nav-brand" href="/">
      <img
      height="50" 
      src="https://static.wixstatic.com/media/8d6fde_4ca895424eaf43f6a56e6bdeef5f2d14~mv2.png/v1/crop/x_0,y_0,w_664,h_211/fill/w_245,h_71,al_c,q_85,usm_0.66_1.00_0.01/TogeDOOR_edited.webp"  />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="ml-auto guest-nav-links">
          <Nav.Link href="/">English</Nav.Link>
          <Nav.Link href="#/login">Sign In</Nav.Link>
          <Form inline>
            <Button href="#/register" id="btnJoinus" >
              Join us
            </Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GuestHeader;
