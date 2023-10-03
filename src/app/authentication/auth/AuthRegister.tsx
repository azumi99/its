import React, { useState } from 'react';
import { Box, Typography, Button, InputAdornment, IconButton } from '@mui/material';

import CustomTextField from '@/app/(pageAll)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { loginInterface, registerinterface } from '@/interface/interfaces';
import { registerService } from '@/service/registerService';
import { loginService } from '@/service/loginService';
import { useRouter } from 'next/navigation';
import { setToken } from '@/config/authCheck';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [valid, setValid] = useState<registerinterface>();
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const param: registerinterface = {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirm,
            }
            const response = await registerService(param);
            setValid(response);
            if(response.message){
                const param: loginInterface = {
                    email: email,
                    password: password,
                }
               const ress = await loginService(param);
               if (ress.access_token){
                setToken(ress.access_token, router);
              } else {
                console.log('error')
              }
            }
        } catch (error) {
            
        }
    }
    return (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <form onSubmit={handleSubmit}>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                    <CustomTextField error={valid?.name ? true : false} onChange={(e: any) => setName(e.target.value)} id="name" variant="outlined" helperText={valid?.name} fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField error={valid?.email ? true : false} id="email" onChange={(e: any) => setEmail(e.target.value)} variant="outlined" helperText={valid?.email} fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField 
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}    
                        error={valid?.password ? true : false} 
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e: any) => setPassword(e.target.value)} 
                        id="password" 
                        variant="outlined" 
                        helperText={valid?.password} 
                        fullWidth 
                    />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Confirm Password</Typography>
                    <CustomTextField 
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}   
                        error={valid?.password_confirmation ? true : false} 
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e: any) => setConfirm(e.target.value)} 
                        id="confirm_password" 
                        variant="outlined" 
                        helperText={valid?.password_confirmation} 
                        fullWidth 
                        />
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth type='submit'>
                    Sign Up
                </Button>
            </form>
        </Box>
        {subtitle}
    </>
    )
};

export default AuthRegister;
