import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark text-white">
            <div className="nav-brand">
                <Link to='/'>
                    <img src='./images/eagle.png' className="logo" alt="Finding Falcon"/>
                </Link>
            </div>
        </nav>
    );
}

export default Header;