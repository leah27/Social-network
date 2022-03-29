import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { createField, Element } from '../Common/FormControls/FormControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router'
import style from '../Common/FormControls/FormControls.module.css'

const Input = Element("input");

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {/* {createField("Email", "email", [required], Input)} */}
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input} validate={[required]} />
            </div>
            {/* {createField("Password", "password", [required], Input, { type: "password" })} */}
            <div>
                <Field placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"} />
            </div>
            {/* {createField(null, "rememberMe", [], Input, { type: "checkbox" }), "remember me"} */}
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input} />remember me
            </div>
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && <Field placeholder={"Symbols from image"} name={"captcha"} component={Input} validate={[required]} />}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login);

