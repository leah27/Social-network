import axios, { AxiosResponse } from 'axios'
import { ProfileType } from '../types/commonTypes'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { "API-KEY": "9e3a9167-c5e3-48c1-9fee-9bbb6afcea96" }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}
type GetLoginAPITypes = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginAPITypes = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const getUsersAPI = (currentPage: number, pageSize: number) => {
    return (
        instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    )
}

export const followAPI = (id: number) => {
    return (
        instance.post(`follow/${id}`, {},)
            .then(response => response.data)
    )
}

export const unfollowAPI = (id: number) => {
    return (
        instance.delete(`follow/${id}`)
            .then(response => response.data)
    )
}

export const getProfileAPI = (id: number) => {
    return (
        instance.get(`profile/` + id)
        // .then(response => response.data)
    )
}

export const getLoginAPI = () => {
    return (
        instance.get<GetLoginAPITypes>(`auth/me`).then(res => res.data)
    )
}
export const loginAPI = (email: string, password: string, rememberMe = false, captcha: null | string = null) => {
    return (
        instance.post<LoginAPITypes>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    )
}
export const logoutAPI = () => {
    return (
        instance.delete(`auth/login`)
    )
}
export const getStatusAPI = (userId: number) => {
    return (
        instance.get(`profile/status/` + userId)
    )
}
export const updateStatusAPI = (status: string) => {
    return (
        instance.put(`profile/status`, { status: status })
    )
}

export const savePhotoAPI = (photoFile: any) => {
    const formData = new FormData();
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const saveProfileAPI = (profile: ProfileType) => {
    return instance.put(`profile`, profile)
}

export const getCaptchaUrlAPI = () => {
    return instance.get(`security/get-captcha-url`);
}