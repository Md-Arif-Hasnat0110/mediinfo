import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MedicalRecords from './components/MedicalRecords';
import Navbar from './components/Navbar';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to = "/login" / > ;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to = "/dashboard" / > ;
    }

    return children;
};

function App() {
    return ( <
        ThemeProvider theme = { theme } >
        <
        CssBaseline / >
        <
        AuthProvider >
        <
        Router >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/register"
        element = { < Register / > }
        /> <
        Route path = "/dashboard"
        element = { <
            PrivateRoute >
            <
            Dashboard / >
            <
            /PrivateRoute>
        }
        /> <
        Route path = "/records"
        element = { <
            PrivateRoute allowedRoles = {
                ['doctor']
            } >
            <
            MedicalRecords / >
            <
            /PrivateRoute>
        }
        /> <
        Route path = "/"
        element = { < Navigate to = "/dashboard" / > }
        /> < /
        Routes > <
        /Router> < /
        AuthProvider > <
        /ThemeProvider>
    );
}

export default App;