import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <main>
            Layout
            <Outlet />
        </main>
    )
}

export default Layout
