import axios from 'axios';
import jwt_decode from "jwt-decode";

export const api = axios.create({
    baseURL: getBaseUrl()
})

export const apiJWT = axios.create({
    baseURL: getBaseUrl()
})

function getBaseUrl(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
        return 'http://localhost:3080'
    else
        return 'https://gupshup-server.herokuapp.com'
}