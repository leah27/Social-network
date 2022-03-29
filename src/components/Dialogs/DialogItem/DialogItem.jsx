import React from 'react';
import { NavLink } from 'react-router-dom';
import c from '../Dialogs.module.css'

const DialogItem = (props) => {

    return (
        <div className={c.item}>
            <img src={props.src} className={c.avatar} />
            <NavLink to={'/dialogs/' + props.id} className={c.user} activeClassName={c.activeLink}>
                {props.user}

            </NavLink>

        </div>
    )
}

export default DialogItem;