import React from 'react'
import c from './Users.module.css'
import { NavLink } from 'react-router-dom';

export const User = ({ user, followingInProgress, follow, unfollow }) => {
    // let u = user;
    return (
        <div className={c.wrapper}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} className={c.icon} />
                    </NavLink>
                </div>
                <div>

                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} className={c.button} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} className={c.button} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>}

                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    {/* <div>{u.location.city}</div>
                    <div>{u.location.country}</div> */}
                </span>
            </span>
        </div>
    )
}

export default User;