import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';
import {  Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
} from '@mui/material';

const Login = () => {

  //After all checks are passed, proceed to sign in functionality
  let {loginUser} = useContext(AuthContext)


  const loginSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        //validation functions
        function validate_email(email) {
            const expression = /^[^@]+@\w+(\.\w+)+\w$/
             if (expression.test(email) === true) {
               // Email is good
               return true
             } else {
               // Email isn't good
               return false
             }
          }
          function validate_password(password) {
            if (password.length <= 5) { // greater than 6
              return false} 
            else {
              return true
            }
          }

        const email_warning = document.getElementById('email_warning');
        const password_warning = document.getElementById('password_warning');
        const login_warning = document.getElementById('login_warning');
        email_warning.innerHTML = '';
        password_warning.innerHTML = '';
        login_warning.innerHTML = '';

        if (validate_email(email) === false) {
            email_warning.innerHTML='Please add a valid email address';
            return
          }
          if (validate_password(password) === false) {
            password_warning.innerHTML='Password ought to be 6 or more characters';
            return
          }else{
            console.log('Done')
            await loginUser
        }
    }


  return (
    <div className='note'>
    <div className='login_container'>
    <Box component="form" noValidate onSubmit={loginUser} sx={{ mt: 1 }}>
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
    </Box>
    </div>
    </div>
  )
}

export default Login