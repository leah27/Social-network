import React, { useState } from 'react'
import Preloader from '../Common/Preloader/Preloader'
import c from './Profile.module.css'
import ProfileDataForm from './ProfileDataForm'
//import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => { setEditMode(false) }
        )
    }

    return (
        <div>
            <div>
                <img className={c.banner} src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg' />
            </div>
            <div className={c.wrapper}>
                <img src={profile.photos.large != null ? profile.photos.large : 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png'} className={c.userAvatar} />
                {isOwner && <input type="file" className={c.addFile} onChange={onMainPhotoSelected} />}
                {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <>
            <div>
                {isOwner && <div>
                    <button onClick={goToEditMode}>Edit</button>
                </div>}
                <div>
                    <b>Full Name:</b> {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                    <div>
                        <b>My professional skills:</b> {profile.lookingForAJobDescription}
                    </div>
                }
            </div>
            {/* <span>
                    <div>{profile.fullName}</div>
                    <div>USER ID: {profile.userId}</div>
                </span> */}
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </>
    )
}


const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b>{contactTitle}:</b>
            {contactValue}
        </div>
    )
}

export default ProfileInfo;