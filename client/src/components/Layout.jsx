import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
    return (
        <div>
            {/* Navigation bar */}
            <nav>
                <div className="logo">Logo</div>
                <ul>
                    <li><Link to="/SignIn">התחברות</Link></li>
                    <li><Link to="items/addItem">פרסום מודעה</Link></li>
                </ul>
            </nav>

            {/* Main content */}
            <main>
                {/* Outlet will render the content based on your route */}
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
