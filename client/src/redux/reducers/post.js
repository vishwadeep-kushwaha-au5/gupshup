import { SET_POSTS, RESET_POST, SET_POST_FIELD, SET_POST_FIELD_WITH_ERROR, RESET_POST_FORM } from '../actions/post'

const INITIAL_STATE = {
    posts: [],
    postForm: {
        desc: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        photo: {
            value: '', 
            validationType: "validateUrl",
            validation: false,
            required: false
        },
    }
}

export default function profile(state = INITIAL_STATE, action) {

    switch (action.type) {
        case SET_POST_FIELD:
            return {
                ...state,
                postForm: { ...state.postForm,
                    [action.inputName]: action.payload
                }
            }
        case SET_POST_FIELD_WITH_ERROR:
            return {
                ...state,
                postForm: { ...state.postForm, 
                    [action.inputName]: action.payload
                }
            }
        case RESET_POST_FORM:
            return{
                ...state,
                postForm: {
                    desc: {
                        value: '', 
                        validationType: "validateText",
                        validation: true,
                        required: true
                    },
                    photo: {
                        value: '', 
                        validationType: "validateUrl",
                        validation: false,
                        required: false
                    },
                }
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload.data
            }
        case RESET_POST:
            return {
                ...state,
                posts: null
            }
        default:
            return state
    }
}