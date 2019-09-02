import React from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import axios from "axios";

export default function Home(props) {
  return (
    <div className="Home">
      <br />
      <br />
      <h1>Welcome to Employee Portal</h1>
      <br />
      <br />
    </div>
  );
}
