import { Box, styled, Tab, Tabs as TabsMui } from '@mui/material'
import React from 'react'




function Tabs({ activeTab, changeViewAndActiveTab }) {
    const TabStyled = styled(Tab)(({ theme }) => ({
        marginRight: 5,
        color: '#000000',
        outline: 'none',
        '&:focus': {
            outline: 'none',
            color: '#000000',
        },
        '& .MuiTouchRipple-root .MuiTouchRipple-child': {
            backgroundColor: '#050201ff', // Couleur du ripple
        },
        '&.Mui-selected': {
            color: '#000000ff', // Couleur du texte quand actif
        },

    }))

    return (
        <Box >
            <TabsMui value={activeTab} aria-label="basic tabs example" TabIndicatorProps={{
                style: {
                    backgroundColor: '#00767A', // couleur de la ligne
                },
            }}>

                <TabStyled

                    tabIndex={0} onClick={changeViewAndActiveTab} label="login" />
                <TabStyled tabIndex={1} onClick={changeViewAndActiveTab} label="sign up" />
            </TabsMui>
        </Box>
    )
}

export default Tabs
