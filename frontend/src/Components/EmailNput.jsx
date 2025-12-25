import { TextField } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const EmailNput = forwardRef((props, ref) => {


    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const validate = () => {
        let isValid = true
        setEmailError('')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!email) {
            setEmailError('Email is required')
            isValid = false
        } else if (!emailRegex.test(email)) {
            setEmailError('email invalid')
            isValid = false
        }
        return isValid

    }

    useImperativeHandle(ref, () => ({
        getValue: () => email,
        valid: () => validate(),
        reset: () => setEmail('')
    }))

    const handleWriteEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <TextField
            value={email}
            onChange={handleWriteEmail}
            required
            id="outlined-required"
            label="Email"
            error={!!emailError}
            helperText={emailError}
            onBlur={validate}
        />
    )
})

export default EmailNput
