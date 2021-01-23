import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../../css/authNav.css";
import { Link } from "react-router-dom";
import store from "../../store";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthHeader = () => {
// debugger

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  //google

  const  logout=(res)=>{
    console.log('out google');
          console.log(res);
        }
        const signOutgoogle=()=> {
          const auth2 = window.gapi.auth2.getAuthInstance()
          if (auth2 != null) {
            auth2.signOut().then(
             // auth2.disconnect().then(this.props.onLogoutSuccess)
             auth2.disconnect().then(logout)
             
            )
          }
          else {
             this.props.onLogoutFailure()
          }
        }
       signOutgoogle() 
    // end google

    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
     
      variant="light"
      className="auth-nav auth-nav-background"
    >
      <Navbar.Brand id="auth-nav-brand" href="/">
      <img 
       src="https://static.wixstatic.com/media/8d6fde_4ca895424eaf43f6a56e6bdeef5f2d14~mv2.png/v1/crop/x_0,y_0,w_664,h_211/fill/w_245,h_71,al_c,q_85,usm_0.66_1.00_0.01/TogeDOOR_edited.webp" 
       
       height="50" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="ml-auto auth-nav-right-links"> 
          <Nav.Link style={{ fontSize: "16px", fontWeight: "400" }} href="/">
            Messages
          </Nav.Link>
          <Nav.Link style={{ fontSize: "16px", fontWeight: "400" }} href="/">
            Orders
          </Nav.Link>
                <Nav.Link onClick={handleLogout} href="/">
                  Logout
                </Nav.Link>
          <a className="nav-link dropdown-toggle">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              width="60"
              height="30"
              className="rounded-circle"
            />
            <div className="auth_nav_side_menu ">
              <Link to="/profile">
                <button>Profile</button>
              </Link>
              <br />
              <Link to="/settings">
                <button>Settings</button>
              </Link>
              <br />
              {/* <button className="" href="#">
              </button> */}
            </div>
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default AuthHeader;
  
