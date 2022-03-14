import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {

    const history = useNavigate()

    const auth = useContext(AuthContext)

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history('/')
    }
    return (
        <nav>
            <div className="nav-wrapper grey darken-1" style={{padding: `0 2rem`}}>
                <span className="brand-logo">LogoDefault</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={"/create"} >Create</NavLink></li>
                    <li><NavLink to={"/links"} >Links</NavLink></li>
                    <li><a href={"/"} onClick={logoutHandler} >Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}