import axios from 'axios';
import { isLoading, success, error } from './status';
import {api, apiJWT} from '../../utils/api'
import { formToKeyValuePair, getHeaders } from '../../utils/helper';
import { validateFields } from '../../utils/validator'

window.validateFields = validateFields
export const SET_PROFILE = "SET_PROFILE"
export const RESET_PROFILE = "RESET_PROFILE"
export const SET_PROFILE_FIELD = "SET_PROFILE_FIELD"
export const SET_PROFILE_FIELD_WITH_ERROR = "SET_PROFILE_FIELD_WITH_ERROR"

export const profileFieldUpdate = (inputName, input) => async (dispatch, getState) => {
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
            type: SET_PROFILE_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: SET_PROFILE_FIELD_WITH_ERROR,
            payload: input,
            inputName: inputName
        })
    }
}

export const submitProfile = (data) => async (dispatch, getState) => {
    let formattedData = formToKeyValuePair(data)
    let userId = getState()?.auth?.user?._id


    if (Object.values(data).every(curr => curr.validation === false)) {
        console.log(data)
        dispatch(isLoading())
        apiJWT.put(`/user/update/${userId}`, {user: formattedData}).then(res => {
            dispatch(success())
            dispatch({
                type: SET_PROFILE,
                payload: {
                    data: res?.data?.result
                }
            })
        }).catch(err => {
            dispatch(error({for: 'updateProfile', message: err.response.data.error}))
        })
    }
}

export const getProfile = (userId) => async (dispatch, getState) => {
    dispatch(isLoading())

    apiJWT.get(`/user/${userId}`).then(res => {
        dispatch(success())
        dispatch({
            type: SET_PROFILE,
            payload: {
                data: res?.data?.result
            }
        })
    }).catch(err => {
        dispatch(error({for: 'getProfile', message: err.response.data.error}))
    })
}

export const follow = (userId) => async (dispatch, getState) => {
    let currentUserId = getState().auth.user._id

    apiJWT.put(`/user/follow/${currentUserId}`, {userId: userId}).then(res => {
    }).catch(err => {
        dispatch(error({for: 'follow', message: err.response.data.error}))
    })
}

export const unfollow = (userId) => async (dispatch, getState) => {
    let currentUserId = getState().auth.user._id

    apiJWT.put(`/user/unfollow/${currentUserId}`, {userId: userId}).then(res => {
    }).catch(err => {
        dispatch(error({for: 'unfollow', message: err.response.data.error}))
    })
}