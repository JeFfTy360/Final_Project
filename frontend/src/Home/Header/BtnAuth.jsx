import { Box, Button, styled, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../utils/Api';
import { CircularProgress } from '@mui/material';
import AvatarMenu from './AvatarMenu';


const BtnAuthStyled = styled(Box)(({ isUser, theme }) => ({
    display: "flex",
    justifyContent: isUser ? "center" : "space-between",
    alignItems: "center",
    margin: "0.5rem",
    gap: '1rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));


function BtnAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/me");
                console.log(api)
                setUser(res.data);                // utilisateur connecté
            } catch (error) {
                setUser(null);                    // pas connecté (401, 403, etc.)
                console.error("Authentication error:", error);
            }
            setLoading(false);
            // setUser("o")
        };

        fetchUser();

    }, []);

    if (loading) return <CircularProgress size={30} color='#044B6F' />
    return (
        <BtnAuthStyled isUser={!!user}>

            {/* PAS CONNECTÉ → boutons */}
            {!user && (
                <>
                    <Button variant="outlined" sx={{ color: "black" }}>
                        Se connecter
                    </Button>
                    <Button sx={{ backgroundColor: "#044B6F" }} variant="contained">
                        S'inscrire
                    </Button>
                </>
            )}

            {/* CONNECTÉ → avatar */}
            {user && (
                // <Avatar
                //     alt={user.username || "Profil"}
                //     src={user.avatar}
                //     sx={{ width: 40, height: 40, cursor: "pointer" }}
                // />
                <AvatarMenu
                    alt={user.username || "Profil"}
                    src={user.avatar}
                    sx={{ width: 40, height: 40, cursor: "pointer" }}
                />
            )}

        </BtnAuthStyled>
    )
}

export default BtnAuth;
