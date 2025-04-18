import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message || 'Failed to login');
        }
    };

    return ( <
        Container maxWidth = "sm" >
        <
        Box sx = {
            { mt: 8 }
        } >
        <
        Paper elevation = { 3 }
        sx = {
            { p: 4 }
        } >
        <
        Typography variant = "h4"
        component = "h1"
        gutterBottom align = "center" >
        Medical Records System <
        /Typography> <
        Typography variant = "h5"
        component = "h2"
        gutterBottom align = "center" >
        Login <
        /Typography>

        {
            error && ( <
                Typography color = "error"
                align = "center"
                sx = {
                    { mb: 2 }
                } > { error } <
                /Typography>
            )
        }

        <
        form onSubmit = { handleSubmit } >
        <
        FormControl fullWidth sx = {
            { mb: 2 }
        } >
        <
        InputLabel > Role < /InputLabel> <
        Select value = { role }
        label = "Role"
        onChange = {
            (e) => setRole(e.target.value)
        } >
        <
        MenuItem value = "patient" > Patient < /MenuItem> <
        MenuItem value = "doctor" > Doctor < /MenuItem> < /
        Select > <
        /FormControl>

        <
        TextField fullWidth label = "Email"
        type = "email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        margin = "normal"
        required /
        >

        <
        TextField fullWidth label = "Password"
        type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        margin = "normal"
        required /
        >

        <
        Button type = "submit"
        fullWidth variant = "contained"
        color = "primary"
        sx = {
            { mt: 3, mb: 2 }
        } >
        Login <
        /Button>

        <
        Button fullWidth variant = "text"
        onClick = {
            () => navigate('/register')
        } >
        Don 't have an account? Register < /
        Button > <
        /form> < /
        Paper > <
        /Box> < /
        Container >
    );
};

export default Login;