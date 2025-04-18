import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MedicalRecords = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [formData, setFormData] = useState({
        diagnosis: '',
        treatment: '',
        prescription: '',
        notes: ''
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async() => {
        try {
            const response = await axios.get('http://localhost:5000/api/records/doctor');
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const handleOpen = (patient) => {
        setSelectedPatient(patient);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPatient(null);
        setFormData({
            diagnosis: '',
            treatment: '',
            prescription: '',
            notes: ''
        });
    };

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
            await axios.post('http://localhost:5000/api/records', {
                ...formData,
                patientId: selectedPatient._id
            });
            fetchRecords();
            handleClose();
        } catch (error) {
            console.error('Error creating record:', error);
        }
    };

    const handleDelete = async(recordId) => {
        try {
            await axios.delete(`http://localhost:5000/api/records/${recordId}`);
            fetchRecords();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return ( <
        Container maxWidth = "lg" >
        <
        Box sx = {
            { mt: 4 }
        } >
        <
        Typography variant = "h4"
        component = "h1"
        gutterBottom >
        Medical Records Management <
        /Typography>

        <
        Grid container spacing = { 3 } > {
            records.map((record) => ( <
                Grid item xs = { 12 }
                md = { 6 }
                key = { record._id } >
                <
                Card >
                <
                CardContent >
                <
                Box sx = {
                    { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
                } >
                <
                Typography variant = "h6" > { record.patientId.firstName } { record.patientId.lastName } <
                /Typography> <
                IconButton onClick = {
                    () => handleDelete(record._id)
                }
                color = "error" >
                <
                DeleteIcon / >
                <
                /IconButton> < /
                Box > <
                List >
                <
                ListItem >
                <
                ListItemText primary = "Visit Date"
                secondary = { new Date(record.visitDate).toLocaleDateString() }
                /> < /
                ListItem > <
                Divider / >
                <
                ListItem >
                <
                ListItemText primary = "Diagnosis"
                secondary = { record.diagnosis }
                /> < /
                ListItem > <
                Divider / >
                <
                ListItem >
                <
                ListItemText primary = "Treatment"
                secondary = { record.treatment }
                /> < /
                ListItem > {
                    record.prescription && ( <
                        >
                        <
                        Divider / >
                        <
                        ListItem >
                        <
                        ListItemText primary = "Prescription"
                        secondary = { record.prescription }
                        /> < /
                        ListItem > <
                        />
                    )
                } {
                    record.notes && ( <
                        >
                        <
                        Divider / >
                        <
                        ListItem >
                        <
                        ListItemText primary = "Notes"
                        secondary = { record.notes }
                        /> < /
                        ListItem > <
                        />
                    )
                } <
                /List> < /
                CardContent > <
                /Card> < /
                Grid >
            ))
        } <
        /Grid>

        <
        Dialog open = { open }
        onClose = { handleClose }
        maxWidth = "md"
        fullWidth >
        <
        DialogTitle > Add New Medical Record < /DialogTitle> <
        form onSubmit = { handleSubmit } >
        <
        DialogContent >
        <
        Grid container spacing = { 2 } >
        <
        Grid item xs = { 12 } >
        <
        TextField fullWidth label = "Diagnosis"
        name = "diagnosis"
        value = { formData.diagnosis }
        onChange = { handleChange }
        required /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        TextField fullWidth label = "Treatment"
        name = "treatment"
        value = { formData.treatment }
        onChange = { handleChange }
        required /
        >
        <
        /Grid> <
        Grid item xs = { 12 } >
        <
        TextField fullWidth label = "Prescription"
        name = "prescription"
        value = { formData.prescription }
        onChange = { handleChange }
        /> < /
        Grid > <
        Grid item xs = { 12 } >
        <
        TextField fullWidth label = "Notes"
        name = "notes"
        value = { formData.notes }
        onChange = { handleChange }
        multiline rows = { 4 }
        /> < /
        Grid > <
        /Grid> < /
        DialogContent > <
        DialogActions >
        <
        Button onClick = { handleClose } > Cancel < /Button> <
        Button type = "submit"
        variant = "contained"
        color = "primary" >
        Save <
        /Button> < /
        DialogActions > <
        /form> < /
        Dialog > <
        /Box> < /
        Container >
    );
};

export default MedicalRecords;