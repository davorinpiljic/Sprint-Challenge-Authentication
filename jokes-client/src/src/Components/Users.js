import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import "../App.css";
import icon from "../icon.png";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/users", {
        headers: { Authorization: token }
      })
      .then(users => {
        setUsers(users.data.users);
      });
  });

  return (
    <div>
      {users.map(user => {
        return (
          <Container className="usercard">
            <h1 className="usercard-header">
              <img className="icon" src={icon} />
              Employee Info
            </h1>
            <h2>Name: {user.username}</h2>
            <h2>Department: {user.department}</h2>
          </Container>
        );
      })}
    </div>
  );
}
