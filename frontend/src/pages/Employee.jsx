import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Divider, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Employee = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    // Placeholder data
    const employee = {
        id: id,
        name: `Employee ${id}`,
        bio: 'Experienced professional with a passion for delivering high-quality results. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        skills: ['React', 'Node.js', 'MUI', 'JavaScript'],
        samples: [
            { id: 1, title: 'Project Alpha', link: '#' },
            { id: 2, title: 'Project Beta', link: '#' },
        ],
    };

    const handleBookAppointment = () => {
        navigate(`/booking?employeeId=${employee.id}`);
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ my: 4, p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {employee.name} - {t('Portfolio')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {employee.bio}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" component="h2" gutterBottom>
                    {t('Skills')}
                </Typography>
                <List>
                    {employee.skills.map((skill, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={skill} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" component="h2" gutterBottom>
                    {t('Work Samples')}
                </Typography>
                <List>
                    {employee.samples.map((sample) => (
                        <ListItem key={sample.id}>
                            <ListItemText primary={sample.title} />
                            <Button variant="outlined" href={sample.link} target="_blank">
                                {t('View')}
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleBookAppointment}>
                        {t('Prendre rendez-vous')}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Employee;
