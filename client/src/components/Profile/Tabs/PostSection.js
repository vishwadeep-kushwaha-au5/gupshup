import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { postFieldUpdate, submitPost } from "../../../redux/actions/post"
import UploadImage from '../../misc/cloudinaryImageUpload/imageUpload'

import moment from 'moment';

import { Grid, makeStyles, Paper, Avatar, Typography, Divider, TextField, Button} from "@material-ui/core"
import {AiFillEdit} from 'react-icons/ai'

const useStyles = makeStyles((theme)=>({
    sectionWrapper:{
        width: '100%'
    },
    divider:{
        margin: "5px 0 15px 0px"
    },
    sectionTitle:{
        display: 'flex',
        alignItems: 'center'
    },
    sectionTitleWrapper:{
        display: 'flex'
    },
    fieldHeader:{
        lineHeight: 1,
        textTransform: 'capitalize'
    },
    fieldValue:{
        lineHeight: 1,
        marginBottom: 8,
        textTransform: 'capitalize'
    },
    smallButton:{
        marginLeft: 8
    },
    imagePreview:{
        position: 'relative',
        cursor: 'pointer',
        width: 'fit-content',
        height: 'fit-content'
    },
    removePhoto:{
        position: 'absolute',
        background: 'radial-gradient(red, transparent)',
        padding: '2px 6px',
        borderRadius: '50%',
        right: '5%',
        top: '5%',
        fontWeight: 'bold',
        color: 'white',
    }
}))

const PostSection = () => {
    const classes = useStyles()
    const postForm = useSelector(state=> state.post.postForm)
    const [showError, setShowError]= useState(false)

    const dispatch = useDispatch()
    
    const handleInputChange = (input) =>{
        console.log(input)
        let key = input.target.name
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value //doing this because material ui input return values in string format. This needs to be improved by making a seperate component for textfield input and handling parseInt in that component
        dispatch(postFieldUpdate(input.target.name,{...postForm[input.target.name], value: value}))
    }
    
    const onSubmit = () => {
    //     //Todo: Fix 
        setShowError(true)
        let newPostForm = (({desc, photo})=> ({desc, photo}))(postForm);
        dispatch(submitPost(newPostForm))
    }

    return(
        <Grid container className={classes.sectionWrapper}>
            {/* New Post */}
            <Grid item xs={12}>
                <Paper elevation={0}>
                    <Grid item xs={12}>
                        <TextField fullWidth minRows={3} multiline variant="outlined" size="small" placeholder="What's on your mind?" className={classes.textBox} onChange={handleInputChange} name="desc" value={postForm.desc.value} error={showError && postForm.desc.validation} helperText={showError && <>{postForm.desc.validation}</>}/>
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between" alignItems="center">
                        <Grid item xs={12}>
                            {postForm.photo.value && <div className={classes.imagePreview} onClick={()=>{
                                    handleInputChange({target:{
                                        name: 'photo',
                                        value: ''
                                    }})}}>
                                <div className={classes.removePhoto}>x</div>
                                <img src={postForm.photo.value} width="200" height="200"/>
                            </div>}
                        </Grid>
                        <Grid item>
                            <UploadImage label="Post photo" onChange={handleInputChange} name="photo" value={postForm.photo.value}  error={showError && postForm.photo.validation} helperText={<>{postForm.photo.validation}</>}/>
                        </Grid>
                        <Grid item><Button size="small" varaint="contained" onClick={onSubmit}>Post</Button></Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>)
}

export default PostSection