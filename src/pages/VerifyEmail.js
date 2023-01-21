import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import {  Button, Grid, Box,Typography, Link,
          TextField, FormControlLabel, Checkbox,  
      } from '@mui/material';

const VerifyEmail = () => {

  //After all checks are passed, proceed to sign in functionality
  let {registerUser} = useContext(AuthContext)

  return (
    <div className='note'>
    <div className='login_container'>
    <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 1 }}>

    <Typography component="h4" variant="h6">
        <div className='greetings'>Kindly verify your account to log in. <br/> <br/></div> </Typography>

    <Typography component="h4" variant="h6">
        <p className='info'>A verification link was sent to your email. Check your inbox to verify your account.<br/> <br/>
        If your link has expired or is invalid, provide your email address to generate a new token.</p> </Typography>


    <TextField margin="normal" required fullWidth id="email" label="Email Address" 
        name="email" type="email" autoComplete="email"autoFocus/>

    <Typography className='warning' id='email_warning' variant="body1" 
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}></Typography>
    
    <Button
        fullWidth
        type='submit'
        variant="contained"
        sx={{ mt: 3, mb: 5, visibility: 'visible', background:'#f68657' }}> Submit
    </Button>
    <Typography 
        className='warning'
        id='register_warning'
        variant="body1"
        sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}>
    </Typography>

    <Grid className='reg_option' item>
                  <Link href="/login" variant="body2">
                    {"Back to Login Page"}
                  </Link>
      </Grid>
    </Box>
    </div>
    </div>
  )
}

export default VerifyEmail