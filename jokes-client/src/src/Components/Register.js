import React, { Component, useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

import "../App.css";

import axios from "axios";

export default function Register(props) {
  const useRegisterForm = callback => {
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

  const registerUser = inputs => {
    axios.post("http://localhost:9000/api/register", inputs).then(response => {
      props.history.push("/api/login");
    });
  };
  const { inputs, handleInputChange, handleSubmit } = useRegisterForm(
    registerUser
  );

  return (
    <Container className="register">
      <h2>Register</h2>
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
        <Col>
          <Label for="examplePassword">Employee Department</Label>
          <div class="input-group mb-3">
            <select
              name="department"
              class="custom-select"
              id="inputGroupSelect02"
              onChange={event => handleInputChange(event)}
            >
              <option selected>Select Department...</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </Col>
        <Button color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
