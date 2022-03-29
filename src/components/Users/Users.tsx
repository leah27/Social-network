import React, { FC } from 'react'
import { UserType } from '../../types/commonTypes';
import Paginator from '../Common/Paginator/Paginator';
import User from './User';
// import { followAPI, unfollowAPI } from '../../api/api'

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
    return (
        < div >
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount} pageSize={pageSize} />
            {
                users.map(u => <User key={u.id} user={u}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unfollow={props.unfollow} />)
            }
        </div >
    )
}


export default Users;