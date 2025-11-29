import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CreatePortfolio = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        bio: '',
        skills: '',
        samples: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle create portfolio logic here
        console.log(formData);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {t('Créer mon portfolio')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="bio"
                        label={t('Biographie')}
                        name="bio"
                        multiline
                        rows={4}
                        autoFocus
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="skills"
                        label={t('Compétences')}
                        name="skills"
                        multiline
                        rows={2}
                        value={formData.skills}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="samples"
                        label={t('Exemples de travail (liens)')}
                        type="text"
                        id="samples"
                        value={formData.samples}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('Enregistrer le portfolio')}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreatePortfolio;
