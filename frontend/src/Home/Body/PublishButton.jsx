import React from 'react'
import {
    Button,
    Box,
    styled
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';


const PublishButtonStyled = styled(Button)(() => ({
    background: 'linear-gradient(90deg, #FF8839 0%, #FF8839 100%)',
    borderRadius: 5,
    textTransform: 'none',
    fontSize: 16,

}));


function PublishButton() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, alignItems: 'center', alignContent: 'center' }}>
            <PublishButtonStyled
                variant="contained"
                sx={{
                    px: 3,
                    py: 1,
                    width: { xs: '100%', sm: 'auto' }
                }}
                startIcon={<AddCircle />}
            >
                Publier une annonce
            </PublishButtonStyled>
        </Box>
    )
}

export default PublishButton
