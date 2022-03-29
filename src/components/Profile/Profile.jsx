import React from 'react'
import c from './Profile.module.css'

import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo'

const Profile = (props) => {
    //debugger;
    return (
        <div >
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                saveProfile={props.saveProfile}
                updateStatus={props.updateStatus} />
            <div className={c.posts}>
                <MyPostsContainer />
            </div>

        </div>
    )
}

export default Profile;