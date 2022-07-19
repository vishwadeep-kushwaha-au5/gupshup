export const IS_LOADING = "IS_LOADING"
export const SUCCESS = "SUCCESS"

export const ERROR = "ERROR"

export const isLoading = (data) => {
    return ({
        type: IS_LOADING
    })
}

export const success = (data) => {
    return ({
        type: SUCCESS
    })
}

export const error = (data) => {
    return ({
        type: ERROR,
        payload: {[data.for]:data.message}
    })
}