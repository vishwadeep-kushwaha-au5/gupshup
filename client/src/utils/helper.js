export const formToKeyValuePair = (reduxObj) =>{
    let resultObj = {};

    Object.keys(reduxObj).forEach(key => resultObj[key]=reduxObj[key].value);
    return resultObj;
}

export const getHeaders = (accessToken) => {
    return {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }
}