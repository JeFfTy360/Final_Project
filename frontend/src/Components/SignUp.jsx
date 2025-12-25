import { Button, Card, CardContent, CardMedia, FormHelperText, TextField, Typography, Switch, FormControlLabel, Box, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import EmailNput from './EmailNput';
import PasswordInput from './PasswordInput';
import api from '../utils/api';

const SignupStyled = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '540px',
    height: 'fit-content',

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        minHeight: '450px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '1rem',
        margin: '0.5rem',
        minHeight: '400px',
    }
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
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

const FormContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '1rem',
    }
}));

const ColumnBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
}));

function SignUp() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);

    // Company fields
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    // Employee fields
    const [employeeBio, setEmployeeBio] = useState('');
    const [employeeTitle, setEmployeeTitle] = useState('');

    const [response, setResponse] = useState('');

    const passwordRef = useRef();
    const emailRef = useRef();
    const passwordVerificationRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = {
            name: name,
            email: emailRef.current.getValue(),
            password: passwordRef.current.getValue(),
            phone: phone,
            is_company: isCompany,
            is_employee: isEmployee
        };

        // Add company fields if is_company is true
        if (isCompany) {
            data.company_name = companyName;
            data.company_description = companyDescription;
            data.company_address = companyAddress;
        }

        // Add employee fields if is_employee is true
        if (isEmployee) {
            data.employee_bio = employeeBio;
            data.employee_title = employeeTitle;
        }

        console.log(data);

        api.post('/auth/register', data)
            .then(response => {
                console.log("ok");
                // Reset all fields
                setName('');
                setPhone('');
                setIsCompany(false);
                setIsEmployee(false);
                setCompanyName('');
                setCompanyDescription('');
                setCompanyAddress('');
                setEmployeeBio('');
                setEmployeeTitle('');
                emailRef.current.reset();
                passwordRef.current.reset();
                passwordVerificationRef.current.reset();
                setResponse({ msg: "Compte créé avec succès", type: "success" });
            })
            .catch(error => {
                console.error(error);
                const errorMsg = error.response?.data?.detail || "Un utilisateur avec cet email existe déjà";
                setResponse({ msg: errorMsg, type: "error" });
            });
    };

    const validate = () => {
        let valid = true;

        // Validate name (min 2, max 100 characters)
        if (!name || name.length < 2 || name.length > 100) {
            setResponse({ msg: "Le nom doit contenir entre 2 et 100 caractères", type: "error" });
            return false;
        }

        let validationPassword = passwordRef.current.valid();
        let validationEmail = emailRef.current.valid();

        if (validationPassword && validationEmail) {
            const pwd = passwordRef.current.getValue();
            const pwdVerif = passwordVerificationRef.current.getValue();

            // Validate password (min 8 characters)
            if (pwd.length < 8) {
                setResponse({ msg: "Le mot de passe doit contenir au moins 8 caractères", type: "error" });
                return false;
            }

            if (pwd !== pwdVerif) {
                setResponse({ msg: "Les mots de passe ne correspondent pas", type: "error" });
                return false;
            }

            // Validate phone
            if (!phone) {
                setResponse({ msg: "Le numéro de téléphone est requis", type: "error" });
                return false;
            }

            // Validate company fields if is_company is true
            if (isCompany) {
                if (!companyName || !companyDescription || !companyAddress) {
                    setResponse({ msg: "Tous les champs de compagnie sont requis", type: "error" });
                    return false;
                }
            }

            // Validate employee fields if is_employee is true
            if (isEmployee) {
                if (!employeeBio || !employeeTitle) {
                    setResponse({ msg: "Tous les champs employé sont requis", type: "error" });
                    return false;
                }
            }
        } else {
            setResponse({ msg: "Veuillez corriger les erreurs dans le formulaire", type: "error" });
            return false;
        }

        return valid;
    };

    return (
        <SignupStyled>
            <StyledCardMedia
                component='img'
                image="undraw_login_weas.png"
                alt="Signup illustration"
            />
            <StyledCardContent>
                <Typography
                    textAlign='center'
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        mb: 2
                    }}
                >
                    Inscription
                </Typography>

                <form onSubmit={handleSubmit}>
                    <FormContainer>
                        {/* Colonne Gauche - Champs principaux */}
                        <ColumnBox>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                label="Nom complet"
                                size="small"
                                fullWidth


                            />
                            <TextField
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                label="Téléphone"
                                placeholder="+509 0000 0000"
                                size="small"
                                fullWidth
                            />

                            <EmailNput ref={emailRef} />
                            <PasswordInput
                                ref={passwordRef}
                                placeholder='Mot de passe'
                            />
                            <PasswordInput
                                ref={passwordVerificationRef}
                                placeholder='Vérification du mot de passe'
                            />
                        </ColumnBox>

                        {/* Colonne Droite - Champs conditionnels */}
                        <ColumnBox>
                            {/* Company Toggle */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isCompany}
                                        onChange={(e) => setIsCompany(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Je représente une compagnie"
                                sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />

                            {/* Company Fields */}
                            {isCompany && (
                                <>
                                    <TextField
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        label="Nom de la compagnie"
                                        size="small"
                                        fullWidth
                                    />
                                    <TextField
                                        value={companyDescription}
                                        onChange={(e) => setCompanyDescription(e.target.value)}
                                        required
                                        label="Description de la compagnie"
                                        multiline
                                        rows={2}
                                        size="small"
                                        fullWidth
                                    />
                                    <TextField
                                        value={companyAddress}
                                        onChange={(e) => setCompanyAddress(e.target.value)}
                                        required
                                        label="Adresse de la compagnie"
                                        size="small"
                                        fullWidth
                                    />
                                </>
                            )}

                            {/* Employee Toggle */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isEmployee}
                                        onChange={(e) => setIsEmployee(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Je suis un employé"
                                sx={{
                                    mt: isCompany ? 1 : 0,
                                    '& .MuiTypography-root': {
                                        fontSize: { xs: '0.875rem', sm: '1rem' }
                                    }
                                }}
                            />

                            {/* Employee Fields */}
                            {isEmployee && (
                                <>
                                    <TextField
                                        value={employeeTitle}
                                        onChange={(e) => setEmployeeTitle(e.target.value)}
                                        required
                                        label="Titre/Poste"
                                        size="small"
                                        fullWidth
                                        placeholder="Ex: Développeur, Manager..."
                                    />
                                    <TextField
                                        value={employeeBio}
                                        onChange={(e) => setEmployeeBio(e.target.value)}
                                        required
                                        label="Biographie"
                                        multiline
                                        rows={3}
                                        size="small"
                                        fullWidth
                                    />
                                </>
                            )}
                        </ColumnBox>
                    </FormContainer>

                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                backgroundColor: '#044B6F',
                                '&:hover': {
                                    backgroundColor: '#033856',
                                },
                                py: { xs: 1, sm: 1.5 },
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                        >
                            S'inscrire
                        </Button>

                        <FormHelperText
                            sx={{
                                color: response.type === 'error' ? 'red' : 'green',
                                textAlign: "center",
                                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                mt: 1
                            }}
                        >
                            {response.msg}
                        </FormHelperText>
                    </Box>
                </form>
            </StyledCardContent>
        </SignupStyled>
    );
}

export default SignUp;