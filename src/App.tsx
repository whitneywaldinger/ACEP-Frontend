import React from "react";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import HomePage from "./pages/home";
import {Router} from "react-router-dom";



// Main App component
function App() {
  return (
    <div className="App">
        <div className="page">
            <HomePage/>
        </div>
    </div>
  );
}


export default App;
