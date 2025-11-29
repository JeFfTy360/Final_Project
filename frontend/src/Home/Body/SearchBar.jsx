import React, { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Box,
} from '@mui/material';
import PublishButton from './PublishButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 1, maxWidth: 600, mx: 'auto' }}>
                <TextField
                    fullWidth
                    placeholder={t("Rechercher des biens ou services")}
                    variant="outlined"
                    size="medium"
                    sx={{ bgcolor: 'white' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        bgcolor: '#00777D',
                        '&:hover': { bgcolor: '#00777D' },
                        minWidth: 80,
                    }}
                >
                    {t('Search')}
                </Button>
            </Box>

            {/* Publish Button */}
            <PublishButton />

        </Container>
    );
}

export default SearchBar;
