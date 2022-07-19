import { SET_PROFILE, RESET_PROFILE, SET_PROFILE_FIELD, SET_PROFILE_FIELD_WITH_ERROR } from '../actions/profile'

const INITIAL_STATE = {
    profile: null,
    profileForm: {
        name: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        from: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
        dob: {
            value: '', 
            validationType: "validateDateTime",
            validation: true,
            required: true
        },
        about: {
            value: '', 
            validationType: "validateText",
            validation: true,
            required: true
        },
    }
}

export default function profile(state = INITIAL_STATE, action) {

    switch (action.type) {
        case SET_PROFILE_FIELD:
            return {
                ...state,
                profileForm: { ...state.profileForm,
                    [action.inputName]: action.payload
                }
            }
        case SET_PROFILE_FIELD_WITH_ERROR:
            return {
                ...state,
                profileForm: { ...state.profileForm, 
                    [action.inputName]: action.payload
                }
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload.data
            }
        case RESET_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state
    }
}