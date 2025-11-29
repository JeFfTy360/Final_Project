import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Search = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q');

    // Placeholder data
    const [results, setResults] = useState([
        { id: 1, title: 'Service 1', description: 'This is a great service.' },
        { id: 2, title: 'Service 2', description: 'Another excellent service.' },
        { id: 3, title: 'Service 3', description: 'You will love this service.' },
    ]);

    useEffect(() => {
        // In a real app, you would fetch search results from an API based on the query
        console.log(`Searching for: ${query}`);
    }, [query]);

    const handleViewService = (serviceId) => {
        // For now, let's navigate to a placeholder company page
        navigate(`/company/${serviceId}`);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('Search Results')}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    {t('Showing results for')}: "{query}"
                </Typography>
                <List>
                    {results.map((result) => (
                        <React.Fragment key={result.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={result.title}
                                    secondary={result.description}
                                />
                                <Button
                                    variant="outlined"
                                    onClick={() => handleViewService(result.id)}
                                >
                                    {t('View')}
                                </Button>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default Search;
