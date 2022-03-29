import { stopSubmit } from 'redux-form';
import { getLoginAPI, loginAPI, logoutAPI, getCaptchaUrlAPI, ResultCodeEnum, ResultCodeForCaptchaEnum } from '../api/api'

const SET_USER_DATA = '/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = '/auth/GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean | false,
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

//Action Creators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
})


type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export const getCaptchUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
})
//Thunk Creators
export const getAuthUsersData = () => async (dispatch: any) => {
    let meData = await getLoginAPI();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = meData.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null) => async (dispatch: any) => {
    let data = await loginAPI(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Success) {
        //success, get auth data
        dispatch(getAuthUsersData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await getCaptchaUrlAPI();
    const captchaUrl = response.data.url;
    dispatch(getCaptchUrlSuccess(captchaUrl));

}

export const logout = () => async (dispatch: any) => {
    let response = await logoutAPI();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;