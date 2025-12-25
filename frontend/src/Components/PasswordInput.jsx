import { IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

const PasswordInput = forwardRef((props, ref) => {


    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')


    useImperativeHandle(ref, () => ({
        getValue: () => password,
        valid: () => validate(),
        reset: () => setPassword('')


    }))

    const validate = () => {
        let isValid = true;
        setPasswordError('');

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            isValid = false;
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter');
            isValid = false;
        } else if (!/[a-z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter');
            isValid = false;
        } else if (!/[0-9]/.test(password)) {
            setPasswordError('Password must contain at least one digit');
            isValid = false;
        } else if (!/[!@#$%^&*()_\+\-=\[\]{},.?]/.test(password)) {
            setPasswordError('Password must contain at least one special character');
            isValid = false;
        }

        return isValid;
    };



    const handleWritePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" >{props.placeholder}</InputLabel >
            <OutlinedInput
                onBlur={validate}
                value={password}
                onChange={handleWritePassword}
                required
                type={showPassword ? 'text' : 'password'}
                error={!!passwordError}

                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}

                        </IconButton>
                    </InputAdornment>
                }
                label={props.placeholder}
            />
            <FormHelperText sx={{ color: "red", textAlign: 'center' }}>{passwordError}</FormHelperText>
        </FormControl >
    )
})

export default PasswordInput
