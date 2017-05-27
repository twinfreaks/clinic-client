import React from 'react';
import {Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from "react-router";
import Logout from "./logout";

class Wrapper extends React.Component {
  render() {
    return (
        <div className="wrapper">
            <Navbar color="faded" className="navbar-inverse" toggleable>
              <NavbarToggler/>
              <NavbarBrand href="/">clinic</NavbarBrand>
              <Collapse isOpen={true} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link className="nav-link" to="/">Home</Link>
                  </NavItem>
                  {localStorage.getItem('id') !== null && <NavItem>
                    <Link className="nav-link" to="/patient-cabinet">Cabinet</Link>
                  </NavItem>}
                  <NavItem>
                    <Link className="nav-link" to="/doctors-list">Doctors list</Link>
                  </NavItem>
                  {localStorage.getItem('id') === null && <NavItem>
                    <Link className="nav-link" to="/login">Log in</Link>
                  </NavItem>}
                  {localStorage.getItem('id') !== null && <NavItem>
                    <Logout/>
                  </NavItem>}
                </Nav>
              </Collapse>
            </Navbar>
          
          <div className="content">
            <main>
              {this.props.children}
            </main>
          </div>
          <footer className="footer">
            <Container>
              <span>Place sticky footer content here.</span>
            </Container>
          </footer>
        </div>
    );
  }
}

export default Wrapper;