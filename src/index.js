import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ContestProvider } from "./context/ContestContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ContestProvider>
          <App />
        </ContestProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
