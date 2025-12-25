'use client';

import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import api from '@/utils/api';

function Headers() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElBusiness, setAnchorElBusiness] = useState(null);

    const userMenuOpen = Boolean(anchorElUser);
    const businessMenuOpen = Boolean(anchorElBusiness);

    // 🔐 Vérification utilisateur connecté
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/auth/me');
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // 📂 Menu utilisateur
    const openUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const closeUserMenu = () => {
        setAnchorElUser(null);
    };

    // 🏢 Menu business
    const openBusinessMenu = (event) => {
        setAnchorElBusiness(event.currentTarget);
    };

    const closeBusinessMenu = () => {
        setAnchorElBusiness(null);
    };

    // 🚪 Déconnexion
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
            router.push('/login');
        } catch (err) {
            console.error('Erreur logout:', err);
        }
        closeUserMenu();
    };

    return (
        <AppBar position="static" elevation={0} color="transparent">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* LOGO */}
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => router.push('/')}
                >
                    TCHEKEM
                </Typography>

                {/* RIGHT SIDE */}
                <Stack direction="row" spacing={3} alignItems="center">
                    {/* FOR BUSINESS */}
                    <Typography
                        variant="body2"
                        sx={{ cursor: 'pointer' }}
                        onClick={openBusinessMenu}
                    >
                        For business
                    </Typography>

                    <Menu
                        anchorEl={anchorElBusiness}
                        open={businessMenuOpen}
                        onClose={closeBusinessMenu}
                    >
                        <MenuItem
                            onClick={() => {
                                closeBusinessMenu();
                                router.push('/login');
                            }}
                        >
                            Employé
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                closeBusinessMenu();
                                router.push('/login');
                            }}
                        >
                            Entreprise
                        </MenuItem>
                    </Menu>

                    <Typography variant="body2">EN</Typography>
                    <Typography variant="body2">MAPS</Typography>
                    <Typography variant="body2">MONNAIE</Typography>
                    <Typography variant="body2">CATALOGUES</Typography>
                    <Typography variant="body2">CUSTOMER SERVICE</Typography>

                    {/* AUTH */}
                    {!loading && (
                        user ? (
                            <>
                                <IconButton onClick={openUserMenu}>
                                    <Avatar
                                        src={user.avatar_url || ''}
                                        alt={user.name || 'User'}
                                    />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorElUser}
                                    open={userMenuOpen}
                                    onClose={closeUserMenu}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            closeUserMenu();
                                            router.push('/profile');
                                        }}
                                    >
                                        Profil
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            closeUserMenu();
                                            router.push('/my-ads');
                                        }}
                                    >
                                        Mes annonces
                                    </MenuItem>

                                    <MenuItem onClick={handleLogout}>
                                        Déconnexion
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={() => router.push('/login')}
                                >
                                    Se connecter
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => router.push('/login')}
                                >
                                    S’inscrire
                                </Button>
                            </>
                        )
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Headers;