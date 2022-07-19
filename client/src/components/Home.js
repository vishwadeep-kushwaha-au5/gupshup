import { Button, Grid, Typography, Divider, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { logout } from '../redux/actions/auth';
import Wrapper from './misc/PageWrapper'
import PostList from './misc/posts/postList';
import PostSection from './Profile/Tabs/PostSection';


const useStyles = makeStyles((theme)=>({
    postSection: {
        marginTop: 8,
        width: '100%',
        [theme.breakpoints.up('sm')]:{
            paddingLeft: 8
        }
    },
    divider:{
        margin: "15px 0px"
    },
    
}))

const Home = () => {
    const [statusLoading , setStatusLoading] = useState("okokok");
    const user = useSelector(state=>state.auth.user)
    const classes = useStyles()
    const dispatch = useDispatch();

    const handleLoadSaveFile = () =>{
        console.log("Loading Game");
        setStatusLoading(true)
    }

    const handleLogout = () =>{
        dispatch(logout(user._id, user.accessToken))
    }

    return <Wrapper>
            <Grid container item xs={12} justifyContent="center">
                <Grid item xs={12} md={8} className={classes.postSection}>
                    <Grid item xs={12}>
                        <PostSection/>
                    </Grid>
                    <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                    <Grid item xs={12}>
                        <PostList userId={user?._id} postType="all"/>
                    </Grid>
                </Grid>
            </Grid>
    </Wrapper>
}

export default Home