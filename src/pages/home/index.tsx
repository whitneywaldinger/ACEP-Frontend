import React from "react";
import "./index.css";
import Header from "../../components/header";
import Search from "../../components/search";


function HomePage(){
    return(
        <div className="home">
            <div className="header">
                <Header/>
            </div>
            {/* Search Section */}
            <Search/>
        </div>
    )
}

export default HomePage;