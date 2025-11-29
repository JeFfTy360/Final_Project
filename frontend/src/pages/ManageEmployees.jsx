import React, { useState } from 'react';
import { Container, Box, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ManageEmployees = () => {
    const { t } = useTranslation();
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
    ]);

    const handleAddEmployee = () => {
        // In a real app, this would open a dialog or navigate to a new page
        console.log('Add new employee');
    };

    const handleDeleteEmployee = (employeeId) => {
        setEmployees(employees.filter(emp => emp.id !== employeeId));
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    {t('Gérer les employés')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddEmployee}
                    sx={{ mb: 3 }}
                >
                    {t('Ajouter un employé')}
                </Button>
                <List sx={{ width: '100%' }}>
                    {employees.map((employee) => (
                        <ListItem key={employee.id} divider>
                            <ListItemText primary={employee.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEmployee(employee.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default ManageEmployees;
