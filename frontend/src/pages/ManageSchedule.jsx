import React, { useState } from 'react';
import { Container, Box, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ManageSchedule = () => {
    const { t } = useTranslation();
    const [schedule, setSchedule] = useState([
        { id: 1, dateTime: '2025-12-01 10:00' },
        { id: 2, dateTime: '2025-12-01 14:00' },
    ]);

    const handleAddSlot = () => {
        // In a real app, this would open a dialog or a form to add a new time slot
        console.log('Add new time slot');
    };

    const handleDeleteSlot = (slotId) => {
        setSchedule(schedule.filter(slot => slot.id !== slotId));
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
                    {t('Gérer mon horaire')}
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddSlot}
                    sx={{ mb: 3 }}
                >
                    {t('Ajouter une disponibilité')}
                </Button>
                <List sx={{ width: '100%' }}>
                    {schedule.map((slot) => (
                        <ListItem key={slot.id} divider>
                            <ListItemText primary={slot.dateTime} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSlot(slot.id)}>
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

export default ManageSchedule;
