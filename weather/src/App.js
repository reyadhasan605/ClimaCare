import logo from './logo.svg';
import React, {useState} from "react";
import CurrentLocation from "./currentLocation";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <h1>
          Next Solution Lab
        </h1>{" "}
      </div>
    </React.Fragment>
  );
}

export default App;
