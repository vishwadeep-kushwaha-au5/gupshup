import { useState, useRef, useEffect, useCallback } from "react";
import { Paper, Grid, makeStyles, Typography, Menu, MenuItem, Avatar } from "@material-ui/core"
import { format} from 'timeago.js';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {AiOutlineLike, AiFillLike} from 'react-icons/ai'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import { likePost } from "../../../redux/actions/post";

const useStyles = makeStyles((theme)=>({
    postWrapper: {
        marginTop: 8
    },
    postAuthorDetailsWrapper:{
        display: 'flex',
        '& h6':{
            textTransform: 'capitalize'
        }
    },
    postDesc:{
        margin: '16px 0px'
    },
    likesWrapper:{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    postPhoto: {
        width: '100%',
        height: '200px',
        borderRadius: 8
    },
    postAuthorName: {
        cursor: 'pointer'
    }
}))

const Post = ({post}) =>{
    const classes = useStyles()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [postLiked, setPostLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const anchorEl = useRef(null);
    const dispatch = useDispatch()
    const history = useHistory();

    const currentUserId = useSelector(state=>state?.auth?.user?._id)
    
    const handleRedirect = useCallback((path) => history.push(path), [history]);

    const handlePostMenuToogle = () => setIsMenuOpen(prevState => !prevState);
    
    const handleEdit = ( )=> {}
    const handleDelete = ( )=> {}
    const handleLike = ( )=> {
        setPostLiked(!postLiked)
        setLikesCount(likesCount + (postLiked?-1:1))
        dispatch(likePost(post._id))
    }

    useEffect(()=>{
        setPostLiked(post.liked)
        setLikesCount(post.likes.length)
    }
    ,[])

    const renderMenu = (
        <Menu
            anchorEl={anchorEl.current}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            getContentAnchorEl={null}
            open={isMenuOpen}
            onClose={handlePostMenuToogle}
        >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
    )

    return <Paper elevation={0} className={classes.postWrapper}>
        <Grid container>
            <Grid container item xs={12}>
                <Grid item xs={2} sm={1}><Avatar src={post.authorProfilePhoto || "https://picsum.photos/600/300"} /></Grid>
                <Grid container item xs={10} sm={11} justifyContent="space-between" alignItems="center">
                    <Grid item className={classes.postAuthorDetailsWrapper}><Typography variant="h6" onClick={()=>handleRedirect(`/profile/${post?.authorId}`)} className={classes.postAuthorName}>{post.authorName}</Typography> &nbsp;&nbsp;&#9679;&nbsp;&nbsp; <Typography variant="subtitle1">{format(post.date)}</Typography></Grid>
                    {currentUserId === post.authorId && <Grid item><Avatar onClick={handlePostMenuToogle} ref={anchorEl}><BiDotsVerticalRounded/></Avatar></Grid>}
                </Grid>
            </Grid>
            <Grid item xs={12}><Typography variant="body2" className={classes.postDesc}>{post.desc}</Typography></Grid>
            {post.photo && <Grid item xs={12}><img className={classes.postPhoto} src={post.photo}/></Grid>}
            <Grid item xs={12} className={classes.likesWrapper} onClick={handleLike}>{postLiked ? <AiFillLike/> : <AiOutlineLike/>}&nbsp;&nbsp;<Typography variant="h6">{likesCount} Likes</Typography></Grid>
        </Grid>
        {renderMenu}
    </Paper>
}

export default Post