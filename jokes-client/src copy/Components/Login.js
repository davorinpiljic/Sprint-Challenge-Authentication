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

import axios from "axios";

export default function Login(props) {
  const useLoginForm = callback => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = event => {
      if (event) {
        event.preventDefault();
      }
      callback(inputs);
    };
    const handleInputChange = event => {
      event.persist();
      setInputs(inputs => ({
        ...inputs,
        [event.target.name]: event.target.value
      }));
    };
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  };

  const loginUser = inputs => {
    axios.post("http://localhost:9000/api/login", inputs).then(response => {
      localStorage.setItem("token", response.data.token);
      props.history.push("/api/users");
    });
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(loginUser);

  return (
    <Container className="register">
      <h2>Sign In</h2>
      <Form className="form" onSubmit={handleSubmit}>
        <Col>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="username"
              onChange={handleInputChange}
              value={inputs.username}
              name="username"
              id="exampleUsername"
              placeholder="Enter username here..."
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              onChange={handleInputChange}
              value={inputs.password}
              name="password"
              id="examplePassword"
              placeholder="Enter password here..."
            />
          </FormGroup>
        </Col>
        <Button color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
