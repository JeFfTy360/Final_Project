'use client';

import { Grid, Box, CircularProgress } from '@mui/material';

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LeaderboardIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";

import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

import StatsCard from './StatsCard';

function GeneralStats() {
    const router = useRouter();

    const [stats, setStats] = useState({
        totalEmployees: 0,
        popularService: "N/A",
        totalRating: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/companies/statistics/');

                if (response.data) {
                    setStats({
                        totalEmployees: response.data.total_employees,
                        popularService: response.data.popular_service.name,
                        totalRating: response.data.company_rate,
                    });
                    setError(false);
                }
            } catch (err) {
                console.error("Erreur lors de la récupération des stats:", err);
                setError(true);
                // router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // ⏳ --- AFFICHAGE DU LOADING SCREEN ---
    if (loading) {
        return (
            <Box
                sx={{
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    }

    return (
        <>
            {/* 👥 Total Employees */}
            <Grid size={{ xs: 4, lg: 4 }}>
                <StatsCard
                    title="Total Employees"
                    value={stats.totalEmployees}
                    icon={<PeopleAltIcon />}
                />
            </Grid>

            {/* 🏆 Service Populaire */}
            <Grid size={{ xs: 4, lg: 4 }}>
                <StatsCard
                    title="Service populaire"
                    value={stats.popularService}
                    icon={<LeaderboardIcon />}
                />
            </Grid>

            {/* ⭐ Note de l'entreprise */}
            <Grid size={{ xs: 4, lg: 4 }}>
                <StatsCard
                    title="Note de l'entreprise"
                    value={stats.totalRating}
                    icon={<StarIcon />}
                />
            </Grid>
        </>
    );
}

export default GeneralStats;
