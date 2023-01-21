import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import {  Button, Grid, Box,Typography, Link,
          TextField, FormControlLabel, Checkbox,  
      } from '@mui/material';

const Register = () => {

  //After all checks are passed, proceed to sign in functionality
  let {registerUser} = useContext(AuthContext)

  return (
    <div className='note'>
    <div className='login_container'>
    <Box className="form" component="form" noValidate onSubmit={registerUser} sx={{ mt: 1 }}>
    
    
    <Typography className="greetings_component" component="h4" variant="h6">
        <div className='greetings'>Create an account to get started...</div> </Typography>
    
    <TextField margin="normal" required fullWidth id="email" label="Email Address" 
        name="email" type="email" autoComplete="email" />

    <Typography className='warning' id='email_warning' variant="body1" 
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}></Typography>
    
    <TextField margin="normal" required fullWidth id="username" label="User Name" 
        name="username" type="text" />
    
    <Typography className='warning' id='username_warning' variant="body1" 
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}></Typography>
    
    <TextField margin="normal" required fullWidth name="password1" label="Password1" 
        type="password" id="password1" />
    
    <Typography 
        className='warning'
        id='password_warning'
        variant="body1"
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> 
    </Typography>
    <TextField
        margin="normal"
        required
        fullWidth
        name="password2"
        label="Password2"
        type="password"
        id="password2"/>
    <Typography 
        className='warning'
        id='password_warning2'
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
        sx={{ mt: 3, mb: 5, visibility: 'visible', background:'#f68657' }}> Sign In
    </Button>
    <Typography 
        className='warning'
        id='register_warning'
        variant="body1"
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}>
    </Typography>
    <div className='reg_option'>
        <Link href="/login" className='link' variant="body2">
          <p>Already have an account? Login</p>
        </Link>
    </div>
    </Box>
    </div>
    </div>
  )
}

export default Register