import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme)=>({
    formError:{
        borderRadius: 999,
        padding: 8,
        backgroundColor: '#ff00008c',
        color: 'white',
        textAlign: 'center'
    }
}))


const ChipNotification = ({message}) =>{
    const classes = useStyles()

    return <>{message && <div className={classes.formError}>
        {message}
    </div>}</>
}

export default ChipNotification