import { useState, useRef, useCallback } from 'react';
import {useHistory} from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth'

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: '#2170dd',
        '& .MuiIconButton-label': {
            color: 'white',
            fontWeight: 500
        }
    }
}))


const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();

    const anchorEl = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const user = useSelector(state => state.auth.user)

    const handleProfileMenuToogle = () => setIsMenuOpen(prevState => !prevState);

    const handleRedirect = useCallback((path) => history.push(path), [history]);

    const handleLogout = () => {
        dispatch(logout(user._id, user.accessToken))
        handleProfileMenuToogle()
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl.current}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            getContentAnchorEl={null}
            open={isMenuOpen}
            onClose={handleProfileMenuToogle}
        >
            <MenuItem onClick={()=>handleRedirect(`/profile/${user._id}`)}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )


    return (
        <div className={classes.grow}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" onClick={()=>handleRedirect('/')}>
                        Gup Shup - A Social Site
                    </IconButton>
                    <div className={classes.grow} />
                    {user && <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        onClick={handleProfileMenuToogle}
                        ref={anchorEl}
                        color="inherit"
                    >
                        <Avatar src={user.picture} />
                        <ArrowDropDownIcon style={{ fontSize: '32px' }} />
                    </IconButton>}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}

export default NavBar;