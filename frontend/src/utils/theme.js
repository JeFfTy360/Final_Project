'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#044B6F',
        },
        secondary: {
            main: '#00777D',
            light: '#e0f2f1'
        },
        warning: {
            main: '#FF8839',
            light: '#f3a57176'
        },
    },
});
// bgcolor: 'white',
//     color: '#00777D',

export default theme;
