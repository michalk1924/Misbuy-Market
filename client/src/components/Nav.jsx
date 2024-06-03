import React from 'react';
import {Link } from 'react-router-dom';
import logo from '../images/logoWithText.png'; 
import '../style/nav.css'

function Nav() {
    return (
            <nav>
                <div className="logo">
                    <Link to="/home">
                        <img src={logo} alt="Logo" id='navLogo'/>
                    </Link>
                </div>
                <ul>
                    <li><Link to="/SignIn">Sign In</Link></li>
                    <li><Link to="items/addItem">Add Item</Link></li>
                </ul>
            </nav>
    );
}

export default Nav;
