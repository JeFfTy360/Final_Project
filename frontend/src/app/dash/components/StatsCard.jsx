import React from 'react';
import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import DashboardCard from "./DashboardCard";

const StatsCard = ({ title, value, icon, trendDirection }) => {
    return (
        <DashboardCard
            title={title}
            sx={{
                minWidth: { xs: '100%', sm: 200, md: 250 },
                maxWidth: { xs: '100%', sm: 300 }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: { xs: 1, sm: 2 },
                    flexWrap: 'wrap'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 300,
                        fontSize: { xs: '1rem', sm: '1rem', md: '2rem' },
                        lineHeight: 1
                    }}
                >
                    {value}
                </Typography>

                {/* Si icon existe → afficher icon, sinon trending */}
                {icon ? (
                    icon
                ) : trendDirection === 'up' ? (
                    <TrendingUp
                        sx={{
                            color: '#4a9eff',
                            fontSize: { xs: 28, sm: 32, md: 36 }
                        }}
                    />
                ) : (
                    <TrendingDown
                        sx={{
                            color: '#4a9eff',
                            fontSize: { xs: 28, sm: 32, md: 36 }
                        }}
                    />
                )}
            </Box>
        </DashboardCard>
    );
};

export default StatsCard;
