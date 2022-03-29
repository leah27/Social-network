import React from 'react'
import { NavLink } from 'react-router-dom';
import c from './Nav.module.css'

console.log(c);
const Nav = () => {
    return (
        <nav className={c.nav}>

            <ul>
                <li>
                    <NavLink to='/profile' activeClassName={c.activeLink}>Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/dialogs' activeClassName={c.activeLink}>Messages</NavLink>
                </li>
                <li>
                    <NavLink to='/Users' activeClassName={c.activeLink}>Users</NavLink>
                </li>
                <li>
                    <NavLink to='/news' activeClassName={c.activeLink}>News</NavLink>
                </li>
                <li>
                    <NavLink to='/music' activeClassName={c.activeLink}>Music</NavLink>
                </li>
                <li>
                    <NavLink to='/settings' activeClassName={c.activeLink}>Settings</NavLink>
                </li>
            </ul>
        </nav>
    )

}

export default Nav;