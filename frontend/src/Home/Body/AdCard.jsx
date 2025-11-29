import React from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Box,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    Share,
} from '@mui/icons-material';


function AdCard({ price, title, address }) {
    return (
        <Card sx={{ boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
            <CardMedia
                component="div"
                sx={{
                    minHeight: 250,
                    width: '100%',
                    bgcolor: '#e0e0e0',
                }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center', }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {price}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                whiteSpace: "normal",
                                display: "block"
                            }}
                        >
                            {title} d, {address}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                            size="small"
                            onClick={() => (console.log("need to implement tooglr function"))}
                            // sx={{ color: favorites.has(property.id) ? 'red' : 'grey.400' }}
                            sx={{ color: 'grey.400' }}
                        >
                            {/* {favorites.has(property.id) ? (
                                <Favorite fontSize="small" />
                            ) : (
                                <FavoriteBorder fontSize="small" />
                            )} */}
                            <FavoriteBorder fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'grey.400' }}>
                            <Share fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default AdCard
