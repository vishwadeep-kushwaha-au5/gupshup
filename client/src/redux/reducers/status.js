import { IS_LOADING, SUCCESS, ERROR } from '../actions/status'

const INITIAL_STATE = {
    isLoading: false,
    success: false,
    error: false
}

export default function status(state = INITIAL_STATE, action) {
    switch (action.type) {
        case IS_LOADING:
            return {
                isLoading: true,
                success: false,
                error: false
            }
        case SUCCESS:
            return {
                isLoading: false,
                success: true,
                error: false
            }
        case ERROR:
            return {
                isLoading: false,
                success: false,
                error: action.payload
            }
        default:
            return state
    }
}