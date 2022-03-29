import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const WithAuthRedirect = (Component) => {
    let RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to='/login' />
        return <Component {...props} />
    }

    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return connectedAuthRedirectComponent;
}