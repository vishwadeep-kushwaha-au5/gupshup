import { SET_AUTH, REMOVE_AUTH, SET_LOGIN_FIELD, SET_LOGIN_FIELD_WITH_ERROR, SET_SIGNUP_FIELD, SET_SIGNUP_FIELD_WITH_ERROR } from '../actions/auth'

const INITIAL_STATE = {
    user: null,
    loginForm: {
        email: {
            value: '', 
            validationType: "validateEmail",
            validation: true,
            required: true
        },
        password: {
            value: '', 
            validationType: "validatePassword",
            validation: true,
            required: true
        }
    },
    signupForm: {
        name: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        email: {
            value: '', 
            validationType: "validateEmail",
            validation: true,
            required: true
        },
        password: {
            value: '', 
            validationType: "validatePassword",
            validation: true,
            required: true
        }
    }
}

export default function auth(state = INITIAL_STATE, action) {

    switch (action.type) {
        case SET_LOGIN_FIELD:
            return {
                ...state,
                loginForm: { ...state.loginForm,
                    [action.inputName]: action.payload
                }
            }
        case SET_LOGIN_FIELD_WITH_ERROR:
            return {
                ...state,
                loginForm: { ...state.loginForm, 
                    [action.inputName]: action.payload
                }
            }
        case SET_SIGNUP_FIELD:
            return {
                ...state,
                signupForm: { ...state.signupForm,
                    [action.inputName]: action.payload
                }
            }
        case SET_SIGNUP_FIELD_WITH_ERROR:
            return {
                ...state,
                signupForm: { ...state.signupForm, 
                    [action.inputName]: action.payload
                }
            }
        case SET_AUTH:
            return {
                ...state,
                user: action.payload.data
            }
        case REMOVE_AUTH:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}