import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Booking = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const employeeId = searchParams.get('employeeId');

    const [formData, setFormData] = useState({
        employee: employeeId || '',
        date: '',
        time: '',
        clientName: '',
        clientEmail: '',
    });

    // Placeholder for available employees and their schedules
    const availableEmployees = [
        { id: '1', name: 'Employee 1', schedule: ['2025-12-01T10:00', '2025-12-01T11:00'] },
        { id: '2', name: 'Employee 2', schedule: ['2025-12-02T09:00', '2025-12-02T13:00'] },
    ];

    useEffect(() => {
        if (employeeId) {
            setFormData((prev) => ({ ...prev, employee: employeeId }));
        }
    }, [employeeId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle booking logic here
        console.log(formData);
        alert(t('Rendez-vous réservé avec succès!'));
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ my: 4, p: 4 }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    {t('Prendre rendez-vous')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="employee-select-label">{t('Employé')}</InputLabel>
                        <Select
                            labelId="employee-select-label"
                            id="employee-select"
                            name="employee"
                            value={formData.employee}
                            label={t('Employé')}
                            onChange={handleChange}
                            disabled={!!employeeId} // Disable if employeeId is passed in URL
                        >
                            {availableEmployees.map((emp) => (
                                <MenuItem key={emp.id} value={emp.id}>
                                    {emp.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="date"
                        label={t('Date')}
                        name="date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="time"
                        label={t('Heure')}
                        name="time"
                        type="time"
                        InputLabelProps={{ shrink: true }}
                        value={formData.time}
                        onChange={handleChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="clientName"
                        label={t('Votre nom')}
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="clientEmail"
                        label={t('Votre adresse e-mail')}
                        name="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('Réserver maintenant')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Booking;
