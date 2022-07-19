import axios from 'axios';
import { isLoading, success, error } from './status';
import {api, apiJWT} from '../../utils/api'
import { formToKeyValuePair, getHeaders } from '../../utils/helper';
import { validateFields } from '../../utils/validator'

window.validateFields = validateFields
export const SET_AUTH = "SET_AUTH"
export const SET_LOGIN_FIELD = "SET_LOGIN_FIELD"
export const SET_LOGIN_FIELD_WITH_ERROR = "SET_LOGIN_FIELD_WITH_ERROR"
export const SET_SIGNUP_FIELD = "SET_SIGNUP_FIELD"
export const SET_SIGNUP_FIELD_WITH_ERROR = "SET_SIGNUP_FIELD_WITH_ERROR"
export const REMOVE_AUTH = "REMOVE_AUTH"

export const loginFieldUpdate = (inputName, input) => async (dispatch, getState) => {
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
            type: SET_LOGIN_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: SET_LOGIN_FIELD_WITH_ERROR,
            payload: input,
            inputName: inputName
        })
    }
}

export const signUpFieldUpdate = (inputName, input) => async (dispatch, getState) => {
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
            type: SET_SIGNUP_FIELD,
            payload: input,
            inputName: inputName
        })
    }else{
        dispatch({
            type: SET_SIGNUP_FIELD_WITH_ERROR,
            payload: input,
            inputName: inputName
        })
    }
}

export const signup = (data) => async (dispatch, getState) => {
    let formattedData = formToKeyValuePair(data)

    if (Object.values(data).every(curr => curr.validation === false)) {
        dispatch(isLoading())
        api.post('/user/signup', formattedData).then(res => {
            dispatch(success())
            dispatch({
                type: SET_AUTH,
                payload: {
                    data: res?.data?.result
                }
            })
        }).catch(err => {
            dispatch(error({for: 'signup', message: err.response.data.error}))
        })
    }
}

export const login = (data) => async (dispatch, getState) => {
    let formattedData = formToKeyValuePair(data)

    if (Object.values(data).every(curr => curr.validation === false)) {
        dispatch(isLoading())
        api.post('/user/login', formattedData).then(res => {
            dispatch(success())
            dispatch({
                type: SET_AUTH,
                payload: {
                    data: res?.data?.result
                }
            })
        }).catch(err => {
            dispatch(error({for: 'login', message: err.response.data.error}))
        })
    }
}

export const logout = (userId, accessToken) => async (dispatch,getState) => {
    dispatch(isLoading())
    apiJWT.post(`/user/logout/${userId}`).then(res => {
        dispatch(success())
        dispatch({
            type: REMOVE_AUTH
        })
    }).catch(err => {
        dispatch(error({for: 'logout', message: err?.response?.data?.error || err.message}))
    })
}
