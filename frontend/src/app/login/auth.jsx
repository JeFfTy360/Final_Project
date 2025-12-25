"use client";

import { Box, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import Tabs from '@/Components/Tabs';
import SignUp from '@/Components/SignUp';
import Login from '@/Components/Login';

axios.defaults.withCredentials = true;



const AuthStyled = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    gap: '2rem',
    height: '95vh',
    // backgroundColor: '#676666',

    [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'red',
        height: '95vh',
        gap: '1rem',

    }
}))


function Auth() {
    const [activeTab, setActiveTab] = useState(0)
    const router = useRouter()


    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
        api.get('/auth/me')
            .then(response => {
                if (response.status === 200) {
                    router.push('/client/dash')
                }
            })
            .catch(() => { })
    }, [])

    const changeViewAndActiveTab = (e) => {
        setActiveTab(parseInt(e.target.getAttribute('tabindex')))
        setError('')
    }
    const View = activeTab === 0 ? <Login /> : <SignUp />
    return (
        <AuthStyled >
            <Tabs activeTab={activeTab} changeViewAndActiveTab={changeViewAndActiveTab} />
            {View}

            {error}
        </AuthStyled >
    )
}
export default Auth
