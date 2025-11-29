import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState('personal');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log({ ...formData, accountType });
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
                    {t('S\'inscrire')}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label={t('Nom')}
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('Adresse e-mail')}
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('Mot de passe')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                        <FormLabel component="legend">{t('Type de compte')}</FormLabel>
                        <RadioGroup
                            row
                            aria-label="account type"
                            name="accountType"
                            value={accountType}
                            onChange={handleAccountTypeChange}
                        >
                            <FormControlLabel value="personal" control={<Radio />} label={t('Personnel')} />
                            <FormControlLabel value="business" control={<Radio />} label={t('Entreprise')} />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('S\'inscrire')}
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="#" variant="body2" onClick={() => navigate('/login')}>
                            {t('Vous avez déjà un compte? Se connecter')}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
