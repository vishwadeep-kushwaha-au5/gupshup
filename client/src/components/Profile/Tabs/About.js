import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { profileFieldUpdate, submitProfile } from "../../../redux/actions/profile"

import moment from 'moment';

import { Grid, makeStyles, Paper, Avatar, Typography, Divider, TextField, Button} from "@material-ui/core"
import {AiFillEdit} from 'react-icons/ai'

const useStyles = makeStyles((theme)=>({
    sectionWrapper:{
        marginTop: 8,
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
    }
}))

const About = () => {
    const [editable, setEditable] = useState(false);
    const classes = useStyles()
    const profile = useSelector(state=>state.profile.profile)
    const currentUserId = useSelector(state=>state.auth.user._id)

    const toggleEdit = () => setEditable(!editable)

    return(
        <Paper elevation={0} className={classes.sectionWrapper}>
            <Grid container item xs={12}>
                <Grid container item xs={12} justifyContent="space-between">
                    <Grid item className={classes.sectionTitleWrapper}><Typography variant="h6" className={classes.sectionTitle}>Personal details</Typography></Grid>
                    <Grid item>
                        {currentUserId === profile?._id && <Avatar onClick={toggleEdit}><AiFillEdit/></Avatar>}
                    </Grid>
                </Grid>
                <Grid item xs={12}><Divider className={classes.divider}/></Grid>
                
            {!editable?
                <Grid container item xs={12}>
                    <Grid item xs={12}><Typography variant='h6' className={classes.fieldHeader}>Name</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle1' className={classes.fieldValue}>{profile?.name}</Typography></Grid>

                    
                    <Grid item xs={12}><Typography variant='h6' className={classes.fieldHeader}>From</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle1' className={classes.fieldValue}>{profile?.from || 'Empty'}</Typography></Grid>

                    
                    <Grid item xs={12}><Typography variant='h6' className={classes.fieldHeader}>DOB</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle1' className={classes.fieldValue}>{profile?.dob? moment(profile.dob).format('LL') : 'Empty'}</Typography></Grid>

                    
                    <Grid item xs={12}><Typography variant='h6' className={classes.fieldHeader}>About</Typography></Grid>
                    <Grid item xs={12}><Typography variant='subtitle1' className={classes.fieldValue}>{profile?.about || 'Empty'}</Typography></Grid>
                </Grid>: <Edit toggleEdit={toggleEdit} profile={profile}/>}
            </Grid>
        </Paper>)
}


const Edit = ({toggleEdit, profile}) =>{
    const profileForm = useSelector(state=>state.profile.profileForm)

    const changeableOrderFields = ["name", "from", "dob", "about"]
    const [showError, setShowError]= useState(false)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleInputChange = (input) =>{
        let key = input.target.name
        let value = input.target.type==="number"?parseInt(input.target.value):input.target.value //doing this because material ui input return values in string format. This needs to be improved by making a seperate component for textfield input and handling parseInt in that component
        dispatch(profileFieldUpdate(input.target.name,{...profileForm[input.target.name], value: value}))
    }
    
    const onSubmit = () => {
    //     //Todo: Fix 
        setShowError(true)
        let newProfileForm = (({name, from, dob, about})=> ({name, from, dob, about}))(profileForm);
        dispatch(submitProfile(newProfileForm))
    }
    
    useEffect(()=>{
        changeableOrderFields.forEach(fieldName=>{
            dispatch(profileFieldUpdate(fieldName,{...profileForm[fieldName], value: profile[fieldName]}))
        })
    },[])

    return <Grid container item xs={12}>
        <Grid item xs={12}>
                <TextField fullWidth label="Name" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="name" value={profileForm.name.value} error={showError && profileForm.name.validation} helperText={showError && <>{profileForm.name.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth label="From" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="from" value={profileForm.from.value}  error={showError && profileForm.from.validation} helperText={showError && <>{profileForm.from.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth type="date" label="Date of birth" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="dob" value={profileForm.dob.value.split('T')[0]}  error={showError && profileForm.dob.validation} helperText={showError && <>{profileForm.dob.validation}</>}/>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth label="About" variant="outlined" size="small" className={classes.textBox} onChange={handleInputChange} name="about" value={profileForm.about.value}  error={showError && profileForm.about.validation} helperText={showError && <>{profileForm.about.validation}</>}/>
        </Grid>
        <Grid container item xs={12} justifyContent="flex-end">
            <Grid item><Button size="small" variant="outlined" className={classes.smallButton} onClick={toggleEdit}>Cancel</Button></Grid>
            <Grid item><Button size="small" className={classes.smallButton} onClick={onSubmit}>Save</Button></Grid>
        </Grid>
    </Grid>
}


export default About