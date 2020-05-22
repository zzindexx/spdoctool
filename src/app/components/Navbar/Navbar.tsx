import * as React from 'react';
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark fixed-top bg-spblue flex-md-nowrap p-0 shadow">

            <a className="navbar-brand col-sm-3 col-md-2 mr-0 bg-spblue" href="/">
                <img src="/assets/splogo.png" className="mr-3" style={{width: '25px'}}></img>
                SharePoint Documentation Tool
            </a>

            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link to="/faq" className="nav-link">FAQ</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
            </ul>
        </nav>
    );
}