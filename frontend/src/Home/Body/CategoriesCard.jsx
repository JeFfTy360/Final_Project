import React from 'react';
import {
    Typography,
    Button,
    Box
} from '@mui/material';

function CategoriesCard({ icon, label }) {
    return (
        <Button
            fullWidth
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                py: 3,
                bgcolor: 'white',
                color: '#00777D',
                '&:hover': { bgcolor: '#f0f0f0' },
                borderRadius: 2,
            }}
        >
            <Box
                sx={{
                    bgcolor: '#e0f2f1',
                    borderRadius: '50%',
                    p: { xs: 1, sm: 2 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {React.cloneElement(icon, { sx: { fontSize: { xs: 32, sm: 40 } } })}
            </Box>
            <Typography variant="caption" sx={{ textAlign: 'center', color: '#000' }}>
                {label}
            </Typography>
        </Button>
    )
}

export default CategoriesCard
