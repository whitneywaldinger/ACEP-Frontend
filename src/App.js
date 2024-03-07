import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import ComponentPage from "./HomePage";
import {Router} from "react-router-dom";




// Main App component
function App() {
  return ( 
    <div className="App">
        <div className="page">
            <ComponentPage/>
        </div>
        
    </div>
  );
}


export default App;
