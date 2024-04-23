import React from "react";
import ReactDOM from "react-dom";
import { NavLink, Link } from "react-router-dom"

function NavBar({ handleLogout }) {
    
    return (
        <nav>
            <NavLink to="/">home</NavLink>
            <NavLink to="/books">books</NavLink>
            <NavLink to="/profile">profile</NavLink>
            <Link onClick={handleLogout}>logout</Link>
        </nav>
    );
}

export default NavBar;