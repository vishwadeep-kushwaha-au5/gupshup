import axios from 'axios';
import { isLoading, success, error } from './status';
import {api, apiJWT} from '../../utils/api'
import { formToKeyValuePair, getHeaders } from '../../utils/helper';
import { validateFields } from '../../utils/validator'

window.validateFields = validateFields
export const SET_POSTS = "SET_POSTS"
export const RESET_POST = "RESET_POST"
export const RESET_POST_FORM = "RESET_POST_FORM"
export const SET_POST_FIELD = "SET_POST_FIELD"
export const SET_POST_FIELD_WITH_ERROR = "SET_POST_FIELD_WITH_ERROR"

export const postFieldUpdate = (inputName, input) => async (dispatch, getState) => {
    console.log(inputName, input)
    let validationType = input.validationType
    if(input.required && Object.getPrototypeOf(input) !== Object.prototype){
        input["validation"] = validateFields.validateEmpty(input.value);        //check if empty

        if(!input["validation"])        //validate field
            input["validation"] = window["validateFields"][validationType](input.value);
    }
    else{ 
        input["validation"] = window["validateFields"][validationType](input.value);        //validate field
    }
    if(!input["validation"]){
        dispatch({
            type: SET_POST_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: SET_POST_FIELD_WITH_ERROR,
            payload: input,
            inputName: inputName
        })
    }
}

export const updatePost= (userId, data) => async (dispatch, getState) => {
    let formattedData = formToKeyValuePair(data)

    if (Object.values(data).every(curr => curr.validation === false)) {
        dispatch(isLoading())
        apiJWT.put(`/post/update/${userId}`, {user: formattedData}).then(res => {
            dispatch(success())
            dispatch({
                type: SET_POSTS,
                payload: {
                    data: res?.data?.result
                }
            })
        }).catch(err => {
            dispatch(error({for: 'updatePost', message: err.response.data.error}))
        })
    }
}

export const submitPost= (data) => async (dispatch, getState) => {
    let formattedData = formToKeyValuePair(data)
    let currentUser = getState().auth.user
    if (Object.values(data).every(curr => curr.validation === false)) {
        dispatch(isLoading())
        apiJWT.post(`/post/create`, {post: formattedData}).then(res => {
            dispatch(success())
            dispatch({
                type: RESET_POST_FORM
            })
            dispatch({
                type: SET_POSTS,
                payload: {
                    data: [{authorName: currentUser.name, authorProfilePhoto: currentUser.profilePhoto || '' ,...res?.data?.result}, ...getState().post.posts]
                }
            })
        }).catch(err => {
            dispatch(error({for: 'newPost', message: err.response.data.error}))
        })
    }
}

export const getPosts = (userId) => async (dispatch, getState) => {
    dispatch(isLoading())
    apiJWT.get(`/post/allPostsByCurrentUser/${userId}`).then(res => {
        dispatch(success())
        dispatch({
            type: SET_POSTS,
            payload: {
                data: res?.data?.result
            }
        })
    }).catch(err => {
        dispatch(error({for: 'getPost', message: err.response.data.error}))
    })
}

export const getTimelinePost = () => async (dispatch, getState) => {
    dispatch(isLoading())
    apiJWT.get(`/post/timeline`).then(res => {
        dispatch(success())
        dispatch({
            type: SET_POSTS,
            payload: {
                data: res?.data?.result
            }
        })
    }).catch(err => {
        dispatch(error({for: 'getPost', message: err.response.data.error}))
    })
}

export const likePost = (postId) => async (dispatch, getState) => {
    apiJWT.put(`/post/likedislike/${postId}`).then(res => {
    }).catch(err => {
        dispatch(error({for: 'getPost', message: err.response.data.error}))
    })
}