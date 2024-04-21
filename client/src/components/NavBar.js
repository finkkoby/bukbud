import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <NavLink to="/">home</NavLink>
            <NavLink to="/">books</NavLink>
            <NavLink to="/">profile</NavLink>
            <NavLink to="/">logout</NavLink>
        </nav>
    );
}

export default NavBar;