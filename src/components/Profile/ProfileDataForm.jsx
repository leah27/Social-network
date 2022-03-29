import React from 'react'
import { reduxForm, Field } from 'redux-form';
import { createField, Element } from '../Common/FormControls/FormControls'
import style from '../Common/FormControls/FormControls.module.css'
const Input = Element("input");
const Textarea = Element("textarea");

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Full Name:</b> <Field placeholder={"Full name"} name={"fullName"} component={Input} validate={[]} />
            </div>
            <div>
                <b>Looking for a job:</b> <Field type={"checkbox"} name={"lookingForAJob"} component={Input} />
            </div>
            <div>
                <b>My professional skills:</b> <Field placeholder={"My professional skills"} name={"lookingForAJobDescription"} component={Textarea} validate={[]} />
            </div>
            <div>
                <b>About me:</b>
                <Field placeholder={"About me"} name={"aboutMe"} component={Textarea} validate={[]} />
            </div>
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map((key, index) => {
                return <div key={index}>
                    <b>{key}:</b> <Field placeholder={key} name={"contacts." + key} component={Input} validate={[]} />
                </div>
            })}
        </div>
    </form>

}
const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)
export default ProfileDataReduxForm