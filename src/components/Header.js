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

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/">Reset</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://www.geektrust.in/" target="_blank">Geek Trust Home</a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;