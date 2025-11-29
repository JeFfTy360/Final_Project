import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Divider, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Company = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    // Placeholder data
    const company = {
        id: id,
        name: `Company ${id}`,
        description: 'This is a great company that provides excellent services.',
        services: [
            { id: 1, name: 'Service A', price: '$50' },
            { id: 2, name: 'Service B', price: '$75' },
        ],
        employees: [
            { id: 1, name: 'Employee X' },
            { id: 2, name: 'Employee Y' },
        ],
    };

    const handleViewPortfolio = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ my: 4, p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {company.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {company.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" component="h2" gutterBottom>
                    {t('Our Services')}
                </Typography>
                <List>
                    {company.services.map((service) => (
                        <ListItem key={service.id}>
                            <ListItemText primary={service.name} secondary={service.price} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" component="h2" gutterBottom>
                    {t('Our Team')}
                </Typography>
                <List>
                    {company.employees.map((employee) => (
                        <ListItem key={employee.id}>
                            <ListItemText primary={employee.name} />
                            <Button
                                variant="outlined"
                                onClick={() => handleViewPortfolio(employee.id)}
                            >
                                {t('View Portfolio')}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default Company;
