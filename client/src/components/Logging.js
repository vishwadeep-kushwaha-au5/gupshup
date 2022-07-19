// import { login, logout, isAuthenticated, getProfile } from "../utils/auth"4
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from 'react-router-dom'
import { Grid, TextField, Button, Box, Chip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { validateFields } from '../utils/validator'
import { login, signup } from '../redux/actions/auth'
import Wrapper from './misc/PageWrapper'
import ChipNotification from './misc/ChipNotification';

import { signUpFieldUpdate, loginFieldUpdate } from '../redux/actions/auth';


const useStyles = makeStyles((theme) => ({
    togglePage: {
        textAlign: "center",
        paddingTop: '20px',
        cursor: "pointer"
    }
}))

export const Logging = () => {

    const classes = useStyles();
    const history = useHistory();
    const [loginRegister, setLoginRegister] = useState(0); //0 means login page show and 1 means signup page show

    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (user) history.push('/')
    }, [user])

    const toggleLoginRegister = () => setLoginRegister(!loginRegister)
    return (
        <Wrapper>
            {loginRegister ? <Signup toggle={toggleLoginRegister} /> : <Login toggle={toggleLoginRegister} />}
        </Wrapper>)
}


const Signup = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const signupForm = useSelector(state=>state.auth.signupForm) 
    const error = useSelector(state=>state.status.error)

    const [showError, setShowError] = useState(false)
    
    const handleInput = (input) => {
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value
        dispatch(signUpFieldUpdate(input.target.name, {...signupForm[input.target.name], value:value}))
    }

    const handleRegister = () => {
        setShowError(true)
        dispatch(signup(signupForm))
    }

    return (
        <Grid container 
        direction="column"
        alignItems="center"
        justifyContent="center" 
        style={{ minHeight: '100%' }}
        >
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <ChipNotification message={error?.signup}/>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={signupForm.name.value}
                        name="name"
                        onChange={handleInput}
                        fullWidth
                        {...(signupForm.name.validation && showError && { error: true, helperText: signupForm.name.validation })}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={signupForm.email.value}
                        name="email"
                        onChange={handleInput}
                        fullWidth
                        {...(signupForm.email.validation && showError && { error: true, helperText: signupForm.email.validation })}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={signupForm.password.value}
                        name="password"
                        onChange={handleInput}
                        type="password"
                        fullWidth
                        {...(signupForm.password.validation && showError && { error: true, helperText: signupForm.password.validation })}
                    />
                </Grid>
            </Grid>

            <Grid container item xs={12} justifyContent="center">
                <Grid item>
                    <Button color="primary" variant="contained" onClick={handleRegister}>Signup</Button>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={12}>
                    <Box color="text.secondary" className={classes.togglePage} variant="contained" onClick={props.toggle}><Typography variant='h6'>Already an user? Go to login</Typography></Box>
                </Grid>
            </Grid>
        </Grid>
    )
}


const Login = (props) => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const loginForm = useSelector(state=> state.auth.loginForm)
    const error = useSelector(state=>state.status.error)

    const [showError, setShowError] = useState(false)

    const handleInput = (input) => {
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value
        dispatch(loginFieldUpdate(input.target.name, {...loginForm[input.target.name], value:value}))
    }

    const handleLogin = () => {
        setShowError(true)
        dispatch(login(loginForm))
    }

    return (
        <Grid container 
        direction="column"
        alignItems="center"
        justifyContent="center" 
        style={{ minHeight: '100%' }}
        >
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={4}>
                    <ChipNotification message={error?.login}/>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={loginForm.email.value}
                        name="email"
                        onChange={handleInput}
                        fullWidth
                        {...(loginForm.email.validation && showError && { error: true, helperText: <>{loginForm.email.validation}</> })}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={10} md={6}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={loginForm.password.value}
                        name="password"
                        onChange={handleInput}
                        type="password"
                        fullWidth
                        {...((loginForm.password.validation && showError) && { error: true, helperText: <>{loginForm.password.validation}</> })}
                    />
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item>
                    <Button color="primary" onClick={handleLogin}>Login</Button>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item>
                    <Box color="text.secondary" className={classes.togglePage} variant="contained" onClick={props.toggle}><Typography variant='h6'>New here? Get an account</Typography></Box>
                </Grid>
            </Grid>
        </Grid>
    )
} 