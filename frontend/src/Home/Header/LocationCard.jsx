import React from 'react'

import { Typography, Button } from '@mui/material'
import {

    LocationOn,
} from '@mui/icons-material';
function LocationCard({ location }) {
    return (
        <Button
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                color: '#00777D',
                textTransform: 'none',
            }}
        >
            <LocationOn sx={{ fontSize: { xs: 32, sm: 40 } }} />
            <Typography variant="body2">{location}</Typography>
        </Button>
    )
}

export default LocationCard
