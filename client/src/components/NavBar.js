import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom"

function NavBar({ handleLogout }) {
    
    return (
        <nav>
            <NavLink to="/">home</NavLink>
            <NavLink to="/books">books</NavLink>
            <NavLink to="/profile">profile</NavLink>
            <NavLink onClick={handleLogout}>logout</NavLink>
        </nav>
    );
}

export default NavBar;