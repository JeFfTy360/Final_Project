import React from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
            <Button variant="text" onClick={() => navigate('/register')}>{t('S\'inscrire')}</Button>
            <Button variant="contained" onClick={() => navigate('/login')}>{t('Se connecter')}</Button>
        </Box>
    );
}

export default LoginRegister;
