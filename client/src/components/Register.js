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
    MenuItem,
    Grid
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'patient',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        specialization: '',
        licenseNumber: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message || 'Failed to register');
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
        Register <
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
        Select name = "role"
        value = { formData.role }
        label = "Role"
        onChange = { handleChange } >
        <
        MenuItem value = "patient" > Patient < /MenuItem> <
        MenuItem value = "doctor" > Doctor < /MenuItem> < /
        Select > <
        /FormControl>

        <
        Grid container spacing = { 2 } >
        <
        Grid item xs = { 12 }
        sm = { 6 } >
        <
        TextField fullWidth label = "First Name"
        name = "firstName"
        value = { formData.firstName }
        onChange = { handleChange }
        required /
        >
        <
        /Grid> <
        Grid item xs = { 12 }
        sm = { 6 } >
        <
        TextField fullWidth label = "Last Name"
        name = "lastName"
        value = { formData.lastName }
        onChange = { handleChange }
        required /
        >
        <
        /Grid> < /
        Grid >

        <
        TextField fullWidth label = "Email"
        type = "email"
        name = "email"
        value = { formData.email }
        onChange = { handleChange }
        margin = "normal"
        required /
        >

        <
        TextField fullWidth label = "Password"
        type = "password"
        name = "password"
        value = { formData.password }
        onChange = { handleChange }
        margin = "normal"
        required /
        >

        {
            formData.role === 'patient' && ( <
                TextField fullWidth label = "Date of Birth"
                type = "date"
                name = "dateOfBirth"
                value = { formData.dateOfBirth }
                onChange = { handleChange }
                margin = "normal"
                required InputLabelProps = {
                    {
                        shrink: true,
                    }
                }
                />
            )
        }

        {
            formData.role === 'doctor' && ( <
                >
                <
                TextField fullWidth label = "Specialization"
                name = "specialization"
                value = { formData.specialization }
                onChange = { handleChange }
                margin = "normal"
                required /
                >
                <
                TextField fullWidth label = "License Number"
                name = "licenseNumber"
                value = { formData.licenseNumber }
                onChange = { handleChange }
                margin = "normal"
                required /
                >
                <
                />
            )
        }

        <
        Button type = "submit"
        fullWidth variant = "contained"
        color = "primary"
        sx = {
            { mt: 3, mb: 2 }
        } >
        Register <
        /Button>

        <
        Button fullWidth variant = "text"
        onClick = {
            () => navigate('/login')
        } >
        Already have an account ? Login <
        /Button> < /
        form > <
        /Paper> < /
        Box > <
        /Container>
    );
};

export default Register;