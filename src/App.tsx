import React from "react";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import './App.css';
import HomePage from "./pages/home";
import Documentation from "./pages/documentation";



// Main App component
function App() {
  return (
    <div className="App">
        <div className="page">
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/docs" element={<Documentation/>} />
            </Routes>
        </div>
    </div>
  );
}


export default App;
