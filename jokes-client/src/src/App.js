import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import PrivateRoute from "./PrivateRoute";

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
//components
import Login from "./Components/Login";
import Register from "./Components/Register";
import Users from "./Components/Users";
import Home from "./Components/Home";

export default function App(props) {
  const [collapsed, setCollapse] = useState(true);

  function toggleNavbar() {
    setCollapse(!collapsed); 
  }

  function logout() {
    localStorage.clear();
  }

  return (
    <div className="App">
      <Navbar className="navbar" light>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand className="mr-auto">
          <Link to="/" className="link">
            Employee Portal
          </Link>
        </NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <br />
            <NavItem onClick={toggleNavbar}>
              <Link to="/auth/register" className="link">
                <p>Register </p>
              </Link>
            </NavItem>
            <NavItem onClick={toggleNavbar}>
              <Link to="/auth/login" className="link">
                <p>Login </p>
              </Link>
            </NavItem>
            <NavItem onClick={toggleNavbar}>
              <Link className="link" to="/api/users" className="link">
                <p>Users </p>
              </Link>
            </NavItem>
            <Link className="link" onClick={logout}>
              Logout
            </Link>
          </Nav>
        </Collapse>
      </Navbar>

      <Route exact path="/" exact component={Home} />
      <Route exact path="/auth/register" component={Register} />
      <Route exact path="/auth/login" component={Login} />
      <PrivateRoute exact path="/api/users" component={Users} />
    </div>
  );
}
