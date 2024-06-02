import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../images/logoWithText.png'; 

function Layout() {
    return (
        <div>
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

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
