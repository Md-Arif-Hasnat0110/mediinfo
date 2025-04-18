import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
        const navigate = useNavigate();
        const { user, logout } = useAuth();

        const handleLogout = () => {
            logout();
            navigate('/login');
        };

        return ( <
            AppBar position = "static" >
            <
            Toolbar >
            <
            Typography variant = "h6"
            component = "div"
            sx = {
                { flexGrow: 1 }
            } >
            Medical Records System <
            /Typography> {
            user ? ( <
                Box >
                <
                Button color = "inherit"
                onClick = {
                    () => navigate('/dashboard')
                } >
                Dashboard <
                /Button> {
                user.role === 'doctor' && ( <
                    Button color = "inherit"
                    onClick = {
                        () => navigate('/records')
                    } >
                    Medical Records <
                    /Button>
                )
            } <
            Button color = "inherit"
            onClick = { handleLogout } >
            Logout <
            /Button> < /
            Box >
        ): ( <
            Box >
            <
            Button color = "inherit"
            onClick = {
                () => navigate('/login')
            } >
            Login <
            /Button> <
            Button color = "inherit"
            onClick = {
                () => navigate('/register')
            } >
            Register <
            /Button> < /
            Box >
        )
    } <
    /Toolbar> < /
    AppBar >
);
};

export default Navbar;