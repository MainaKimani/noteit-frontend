import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import {  Button, Box,Typography, Link,
          TextField, FormControlLabel, Checkbox,  
      } from '@mui/material';

const Login = () => {

  //After all checks are passed, proceed to sign in functionality
  let {loginUser} = useContext(AuthContext)

  return (
    <div className='note'>
    <div className='login_container'>
    <Box className="form" component="form" noValidate onSubmit={loginUser} sx={{ mt: 1 }}>

    <Typography className='greetings_component'component="h1" variant="h5">
              <div className='greetings'>Log in to get started...</div>
            </Typography>
    <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
    />
    <Typography 
        className='warning'
        id='email_warning'
        variant="body1"
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> 
    </Typography>
    <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
    />
    <Typography 
        className='warning'
        id='password_warning'
        variant="body1"
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> 
    </Typography>
    <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
    />
    <Button
        fullWidth
        type='submit'
        variant="contained"
        sx={{ mt: 3, mb: 5, visibility: 'visible', background:'#f68657' }}> Log In
    </Button>
    <Typography 
        className='warning'
        id='login_warning'
        variant="body1"
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}>
    </Typography>
    <div className='reg_option' item>
        <Link href="/register" className='link' variant="body2">
          <p>Don't have an account? Sign Up</p>
        </Link>
    </div>

    </Box>
    </div>
    </div>
  )
}

export default Login