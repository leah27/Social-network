import React from 'react'
import { NavLink } from 'react-router-dom'
import c from './Header.module.css'
const Header = (props) => {
    return (
        <header className={c.header}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZDP3NuOwG8TWjER60cejFcIINIxlLUrKfSNafJqwu6qpMaystbOvVrS7i-YfMd9do8UI&usqp=CAU' />
            <div className={c.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;