import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RoleState from "./context/roleState.js";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RoleState>
    <Router>
      <App />
    </Router>
  </RoleState>
);
