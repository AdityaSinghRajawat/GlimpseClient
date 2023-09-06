import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './style';
import Glimpse from '../../images/Glimpse.png';
import GLimpseText from '../../images/GlimpseText.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

export default function Navbar() {

    const classes = useStyles();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/");
        setuser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setuser(JSON.parse(localStorage.getItem('profile')));

        //eslint-disable-next-line
    }, [location]);


    return (
        <AppBar position='static' color='inherit' className={classes.appBar}>

            <Link to='/' className={classes.brandContainer}>
      
                <img src={GLimpseText} alt='icon' height="45px" />
                <img src={Glimpse} alt='Glimpse' height="57px" className={classes.image} />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.result.picture} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>

        </AppBar>
    )
}
