'use client';

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    FormHelperText,
    Typography,
    Box,
    styled,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import React, { useRef, useState } from 'react';
import PasswordInput from './PasswordInput';
import EmailNput from './EmailNput';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

/* ===================== STYLES ===================== */

const LoginStyled = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem',
    minWidth: '895px',
    margin: '0 auto',
    minHeight: '540px',

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        minWidth: 'auto',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '1rem',
        margin: '0.5rem',
        flexDirection: 'column',
    }
}));

const Logo = styled(CardMedia)(({ theme }) => ({
    width: '30%',
    maxWidth: '250px',

    [theme.breakpoints.down('md')]: {
        width: '60%',
        maxWidth: '200px',
    },

    [theme.breakpoints.down('sm')]: {
        width: '80%',
        maxWidth: '180px',
    }
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    width: '100%',
    padding: '1rem',

    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem',
    }
}));

/* ===================== COMPONENT ===================== */

function Login() {
    const router = useRouter();

    const [error, setError] = useState('');
    const [errorValidation, setErrorValidation] = useState('');
    const [userType, setUserType] = useState('employee'); // client | employee | company

    const emailRef = useRef();
    const passwordRef = useRef();

    /* ---------- Validation ---------- */
    const validate = () => {
        const isEmailValid = emailRef.current.valid();
        const isPasswordValid = passwordRef.current.valid();

        if (!isEmailValid || !isPasswordValid) {
            setErrorValidation('Vous avez des erreurs dans le formulaire');
            return false;
        }

        setErrorValidation('');
        return true;
    };

    /* ---------- Toggle change ---------- */
    const handleUserTypeChange = (event, newUserType) => {
        if (newUserType !== null) {
            setUserType(newUserType);
        }
    };

    /* ---------- Submit ---------- */
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validate()) return;

        const data = {
            email: emailRef.current.getValue(),
            password: passwordRef.current.getValue(),
        };

        api.post('/auth/login', data)
            .then(() => {
                if (userType === 'company') {
                    router.push('/dash');
                } else if (userType === 'employee') {
                    router.push('/employee/dash');
                } else if (userType === 'client') {
                    router.push('/client/dash');
                }
            })
            .catch(() => {
                setError('Email ou mot de passe incorrect');
            });
    };

    /* ===================== RENDER ===================== */

    return (
        <LoginStyled>
            <Logo
                component="img"
                image="undraw_login_weas.png"
                alt="Login illustration"
            />

            <StyledCardContent>
                <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    Connexion
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* ===== Toggle User Type ===== */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <ToggleButtonGroup
                            value={userType}
                            exclusive
                            onChange={handleUserTypeChange}
                            size="small"
                        >
                            <ToggleButton value="client">Client</ToggleButton>
                            <ToggleButton value="employee">Employé</ToggleButton>
                            <ToggleButton value="company">Entreprise</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    {/* ===== Inputs ===== */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.5rem',
                            '@media (max-width: 900px)': {
                                gridTemplateColumns: '1fr',
                            }
                        }}
                    >
                        <EmailNput ref={emailRef} />
                        <PasswordInput ref={passwordRef} />
                    </Box>

                    {/* ===== Submit ===== */}
                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#044B6F',
                                '&:hover': { backgroundColor: '#033856' }
                            }}
                        >
                            Se connecter
                        </Button>

                        {errorValidation && (
                            <FormHelperText sx={{ color: 'red', textAlign: 'center' }}>
                                {errorValidation}
                            </FormHelperText>
                        )}

                        {error && (
                            <FormHelperText sx={{ color: 'red', textAlign: 'center' }}>
                                {error}
                            </FormHelperText>
                        )}
                    </Box>
                </form>
            </StyledCardContent>
        </LoginStyled>
    );
}

export default Login;
