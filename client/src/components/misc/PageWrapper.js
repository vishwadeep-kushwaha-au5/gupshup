import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        height: '100%',
        marginBottom: 24
    },
    content: {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        padding: '72px 16px 16px 16px',
        [theme.breakpoints.down('xs')]:{
            padding: '68px 16px 16px 16px',
        }
    }
}))

const Wrapper = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.main}>
            <NavBar />
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Wrapper;