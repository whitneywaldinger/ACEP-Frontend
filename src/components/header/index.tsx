import React from "react";
import "./index.css";
import {Link} from "react-router-dom";

function Header(){
    return (
        <header className="App-header">
            <Link className="App-documentation" to={"/docs"}>
                <h1>View Documentation</h1>
            </Link>
            <h1 className="App-title">ACEP Capstone UI</h1>
            <img src="acep-logo.png" className="App-logo" alt="ACEP Logo" />
        </header>
    );
}

export default Header;