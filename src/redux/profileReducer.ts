import { getProfileAPI, getStatusAPI, savePhotoAPI, updateStatusAPI, saveProfileAPI } from '../api/api'
import { PostType, PhotosType, ProfileType, ContactsType } from '../types/commonTypes'
import { stopSubmit } from 'redux-form';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 7, src: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg" },
        { id: 2, message: "Yo :)", likesCount: 5, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKRVTXjnVc3FBgGjnOqDqDL2Fb9X1yAv16Gg&usqp=CAU" },
        { id: 3, message: "Hello world!!!", likesCount: 3, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGyTMhdrDq9kv2A6hJmfjrKoybKZp477zXQ&usqp=CAU" }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};
export type InitialStateType = typeof initialState;
const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
                src: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg"
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };

        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };

        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };

        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await getProfileAPI(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await getStatusAPI(userId)
    dispatch(setStatus(response.data));
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await updateStatusAPI(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await savePhotoAPI(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await saveProfileAPI(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        const msg = response.data.messages[0]
        let contact = msg.split('>')[1].slice(0, -1).toLowerCase();
        dispatch(stopSubmit("edit-profile", { "contacts": { [contact]: response.data.messages[0] } }))
        return Promise.reject(response.data.messages[0]);
    }
}
export default profileReducer;
