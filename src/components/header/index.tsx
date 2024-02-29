import React from "react";
import "./index.css";
import {Link} from "react-router-dom";

function Header(){
    return (
        <header className="App-header">
            <a href="https://github.com/whitneywaldinger/ACEP-Frontend">
                <img src="gh_logo.png" className="GH-logo" alt="GitHub Logo" />
            </a>
            <h1 className="App-title">ACEP Capstone UI</h1>
            <img src="acep-logo.png" className="ACEP-logo" alt="ACEP Logo" />
        </header>
    );
}

export default Header;