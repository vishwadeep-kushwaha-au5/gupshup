import Wrapper from '../misc/PageWrapper'
import { useParams } from 'react-router-dom'
import { Grid, makeStyles, Paper, Typography, Button, Divider, Avatar } from '@material-ui/core'

import { getProfile, follow, unfollow, submitProfile } from '../../redux/actions/profile'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {AiOutlineUsergroupAdd, AiFillEdit} from 'react-icons/ai'
import {FaUserFriends} from 'react-icons/fa'

import About from './Tabs/About'
import PostSection from './Tabs/PostSection' 
import PostList from '../misc/posts/postList'
import UploadImage from '../misc/cloudinaryImageUpload/imageUpload'

import { validateFields } from '../../utils/validator'

const useStyles = makeStyles((theme)=>({
    profileWrapper: {
    },
    profileHeader:{
        width: '100%'
    },
    coverPicture:{
        height: '200px',
        '& img':{
            height: '200px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '24px',
        }
    },
    profileHeaderContent:{

    },
    profilePictureSubWrapper: {
        height: '110px',
        width: '110px',
        position: 'absolute',
        top: '-30%',
        left: '50%',
        borderRadius: '50%',
        [theme.breakpoints.down('md')]:{
            left: '40%'
        },
        [theme.breakpoints.down('sm')]:{
            left: '30%'
        },
        [theme.breakpoints.down('xs')]:{
            left: '35%'
        }
    },
    profilePicture:{
        borderRadius: '50%',
        border: '3px solid white',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('md')]:{
            left: '40%'
        },
        [theme.breakpoints.down('sm')]:{
            left: '30%'
        },
        [theme.breakpoints.down('xs')]:{
            left: '35%'
        }
    },
    profilePictureEditButton:{
        position: 'absolute',
        bottom: '0%',
        right: '0%'
    },
    profilePictureWrapper:{
        height: '100px',
        position: 'relative'
    },
    profileName:{
        lineHeight: 1,
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    profileNameSub:{
        lineHeight: 1,
        textTransform: 'capitalize',
        textAlign: 'center'
    },
    profileNameWrapper:{
        marginBottom: '20px',
        [theme.breakpoints.down('xs')]:{
            justifyContent: 'center'
        }
    },
    profileActionWrapper:{
        justifyContent: 'flex-end',
        marginBottom: '20px',
        [theme.breakpoints.down('xs')]:{
            justifyContent: 'center'
        }
    },
    postSection: {
        marginTop: 8,
        width: '100%',
        [theme.breakpoints.up('sm')]:{
            paddingLeft: 8
        }
    },
    followingSection:{
        marginTop: 8,
        paddingTop: 16,
        width: '100%',
        height: 'fit-content',
        [theme.breakpoints.up('sm')]:{
            paddingLeft: 8
        }
    },
    divider:{
        margin: "15px 0px"
    },
    followingSubSection:{
        display: 'flex',
        marginBottom: 8,
        '& .MuiAvatar-root':{           
            height: '44px',
            fontSize: '28px',
            width: '44px',
        },
        '& span': {
            textAlign: 'center',
            marginLeft: '8px',
        }
    }
}))

const Profile = (props) =>{
    const {userId} = useParams()
    const dispatch = useDispatch()
    const classes = useStyles()

    const profile = useSelector(state=>state.profile.profile)
    const currentUserId = useSelector(state=>state?.auth?.user?._id)
    const [following, setFollowing] = useState(false)

    const handleFollowUnfollow = () => {
        if(following)
            dispatch(unfollow(userId))
        else if(!following)
            dispatch(follow(userId))
        setFollowing(!following)
    }

    const uploadProfilePhoto = (photoObj) => {
        if(photoObj?.target?.value && photoObj?.target?.value.length && !validateFields.validateUrl(photoObj?.target?.value)){
            console.log(photoObj, 'in')
            photoObj.target.validation = false
            dispatch(submitProfile({profilePhoto: photoObj.target}))
        }
    }

    useEffect(()=>{
        if(userId && userId !== undefined && userId !== 'undefined')
            dispatch(getProfile(userId))
    },[userId])

    useEffect(()=>{
        if(profile?._id && (currentUserId !== profile?._id))
            setFollowing(profile.followers.includes(currentUserId))
    },[profile])

    return <Wrapper>
        <div className={classes.profileWrapper}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.profileHeader}>
                        <div className={classes.coverPicture}>
                            <img src="https://picsum.photos/600/300"/>
                        </div>
                        <Grid container className={classes.profileHeaderContent}>
                            <Grid container item xs={12}>
                                <Grid item xs={12} sm={3} className={classes.profilePictureWrapper}>
                                    <div className={classes.profilePictureSubWrapper}>
                                        <img className={classes.profilePicture} src={profile?.profilePhoto || "https://picsum.photos/100/100"}/>
                                        {(currentUserId === profile?._id) && <div className={classes.profilePictureEditButton}>
                                            <UploadImage label={<AiFillEdit/>} displayType="icon" onChange={uploadProfilePhoto} name="profilePhoto" value={profile?.profilePhoto?.value}  error={false && profile?.profilePhoto?.validation} helperText={<>{profile?.profilePhoto?.validation}</>}/>
                                        </div>}
                                    </div>
                                </Grid>
                                <Grid container xs={12} item sm={9} justifyContent="space-between">
                                    <Grid container item xs={12} sm alignContent='center' className={classes.profileNameWrapper}>
                                        <Grid item>
                                            <Typography variant='h6' className={classes.profileName}>{profile?.name}</Typography>
                                            <Typography variant='subtitle1' className={classes.profileNameSub}>Flash</Typography>
                                        </Grid>
                                    </Grid>
                                    {currentUserId !== profile?._id && <Grid container item xs={12} sm alignContent='center' className={classes.profileActionWrapper}>
                                        <Grid item>
                                            <Button variant="outlined">Message</Button>&nbsp;
                                            <Button variant="contained" onClick={handleFollowUnfollow}>{following? 'Unfollow': 'Follow'}</Button>
                                        </Grid>
                                    </Grid>}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container item xs={12}>
                    <Grid container item xs={12} md={4} style={{height: 'fit-content'}}>
                        <Grid container item xs={12}>
                            <Paper elevation={0} className={classes.followingSection}>
                                <Grid item xs={12} className={classes.followingSubSection}><Avatar><FaUserFriends/></Avatar> <span><Typography variant='h6' color='primary'>{profile?.followers?.length}</Typography> Followers</span></Grid>
                                <Grid item xs={12} className={classes.followingSubSection}><Avatar><AiOutlineUsergroupAdd/></Avatar> <span><Typography variant='h6' color='primary'>{profile?.followings?.length}</Typography> Following</span></Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <About/>
                        </Grid>
                    </Grid> 
                    <Grid item xs={12} md={8} className={classes.postSection}>
                        <Grid item xs={12}>
                            <PostSection/>
                        </Grid>
                        <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                        <Grid item xs={12}>
                            <PostList userId={userId} postType="own"/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </Wrapper>
}

export default Profile