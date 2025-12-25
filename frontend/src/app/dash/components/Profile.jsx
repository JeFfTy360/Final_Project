"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    Avatar,
    Box,
    Menu,
    Button,
    IconButton,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    CircularProgress,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import api from "@/utils/api";


const Profile = () => {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await api.get('/auth/me');

                if (response.data) {
                    setUser(response.data);
                    setError(false);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération de l'utilisateur:", err);
                setUser(null);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleLogout = async () => {
        try {
            // Appel à votre endpoint de déconnexion si nécessaire
            await api.post('/auth/logout');
            // Redirection ou reload après déconnexion
            window.location.href = '/login';
        } catch (err) {
            console.error("Erreur lors de la déconnexion:", err);
            // Même si l'appel échoue, redirigez vers login
            window.location.href = '/login';
        }
    };

    // Afficher un loader pendant le chargement
    if (loading) {
        return (
            <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    // Si l'utilisateur n'est pas connecté ou erreur, afficher le bouton de connexion
    if (!user || error) {
        return (
            <Box>
                <Button
                    href="/login"
                    variant="contained"
                    color="primary"
                    component={Link}
                >
                    Login
                </Button>
            </Box>
        );
    }

    // Si l'utilisateur est connecté, afficher le profil
    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show profile menu"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === "object" && {
                        color: "primary.main",
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar
                    src={user.avatar || user.photo || "/images/profile/user-1.jpg"}
                    alt={user.name || user.username || "User"}
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                >
                    {/* Afficher l'initiale si pas d'avatar */}
                    {!user.avatar && !user.photo && (user.name?.[0] || user.username?.[0] || "U")}
                </Avatar>
            </IconButton>
            {/* ------------------------------------------- */}
            {/* Profile Dropdown Menu */}
            {/* ------------------------------------------- */}
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                    "& .MuiMenu-paper": {
                        width: "250px",
                    },
                }}
            >
                {/* En-tête avec nom et email */}
                <Box px={2} py={1.5} borderBottom="1px solid #e0e0e0">
                    <Typography variant="h6" fontWeight={600} noWrap>
                        {user.name || user.username || "User"}
                    </Typography>
                    {user.email && (
                        <Typography variant="caption" color="text.secondary" noWrap>
                            {user.email}
                        </Typography>
                    )}
                </Box>

                <MenuItem component={Link} href="/profile" onClick={handleClose2}>
                    <ListItemIcon>
                        <IconUser width={20} />
                    </ListItemIcon>
                    <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem component={Link} href="/account" onClick={handleClose2}>
                    <ListItemIcon>
                        <IconMail width={20} />
                    </ListItemIcon>
                    <ListItemText>My Account</ListItemText>
                </MenuItem>
                <MenuItem component={Link} href="/tasks" onClick={handleClose2}>
                    <ListItemIcon>
                        <IconListCheck width={20} />
                    </ListItemIcon>
                    <ListItemText>My Tasks</ListItemText>
                </MenuItem>
                <Box mt={1} py={1} px={2}>
                    <Button
                        onClick={handleLogout}
                        variant="outlined"
                        color="primary"
                        fullWidth
                    >
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;

