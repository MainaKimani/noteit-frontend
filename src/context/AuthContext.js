import React from 'react'
import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthContext = createContext({})

export default AuthContext;


export const AuthProvider = ({children}) => {

    let proxy = 'https://noteit-staging.mainakimani.com'

    let authState = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    let userState = localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
    let [authTokens, setAuthTokens] = useState(()=> authState)
    let [userToken, setUserToken] = useState(()=> userState)
    let [logged, setLogged] = useState()
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate();

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
      function validate_username(username) {
        if (username.match(/^[0-9a-z]+$/)){
          return true
        } else {
          return false
        }
      }

    //Register functionality
    let registerUser= async (event) => {
      event.preventDefault()
      const credentials = new FormData(event.currentTarget)
      const email = credentials.get('email')
      const username = credentials.get('username')
      const password1 = credentials.get('password1')
      const password2 = credentials.get('password2')

      const email_warning = document.getElementById('email_warning')
      const password_warning1 = document.getElementById('password_warning')
      const password_warning2 = document.getElementById('password_warning2')
      const register_warning = document.getElementById('register_warning')
      const username_warning = document.getElementById('username_warning')
      username_warning.innerHTML=''
      password_warning1.innerHTML = ''
      password_warning2.innerHTML=''
      email_warning.innerHTML = ''
      register_warning.innerHTML = ''

      if (!validate_email(email)) {
          email_warning.innerHTML='Please add a valid email address'
          return
      }
      if (!validate_password(password1)) {
          password_warning1.innerHTML='Password ought to be 6 or more characters'
          return
       }
       if (password1!==password2) {
        password_warning1.innerHTML='Password entered does not match'
        password_warning2.innerHTML='Password entered does not match'
        return
      }if(!validate_username){
        username_warning.innerHTML='Username may only be composed of alphanumeric characters'
        return
     }
      else{
        console.log('Input checks passed. Pushing to server...')
        //push to api's endpoint
        let res = await fetch(`${proxy}/auth/register/`, {
           method: "POST",
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
            email: email,
            username: username,
            password: password1}),
         })
        let data = await res.json()

        if (res.status === 201) {
          navigate('/');
        }
        else{
          let errrorResponse = (JSON.stringify(data))
          
           if (errrorResponse === '{"email":["user with this email already exists."]}'){
            email_warning.innerHTML = 'User with this email already exists.';
           }
           if (errrorResponse === '{"username":["user with this username already exists."]}'){
            username_warning.innerHTML = 'User with this username already exists.';
           }
           if (errrorResponse === '{"username":["The username should only contain alphanumeric characters"]}'){
            username_warning.innerHTML = 'The username should only contain alphanumeric characters.';
           }
           if (errrorResponse === '{"email":["user with this email already exists."],"username":["user with this username already exists."]}'){
            email_warning.innerHTML = 'User with this email already exists.';
            username_warning.innerHTML = 'User with this username already exists.';
           } else{
            register_warning.innerHTML = errrorResponse;
           }
           
          console.log(errrorResponse)
          console.log(res.status)
        }
      }  
   }

    //log in functionality
    let loginUser= async (event) => {
        event.preventDefault();
        const credentials = new FormData(event.currentTarget);
        const email = credentials.get('email');
        const password = credentials.get('password');

        const email_warning = document.getElementById('email_warning');
        const password_warning = document.getElementById('password_warning');
        const login_warning = document.getElementById('login_warning');
        email_warning.innerHTML = '';
        password_warning.innerHTML = '';
        login_warning.innerHTML = '';

        if (!validate_email(email)) {
            email_warning.innerHTML='Please add a valid email address';
            return
        }
        if (!validate_password(password)) {
            password_warning.innerHTML='Password ought to be 6 or more characters';
            return
         }
        else{
          console.log('Input checks passed. Pushing to server...')
          //push to api's endpoint
          let res = await fetch(`${proxy}/auth/login/`, {
             method: "POST",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
              email: email,
              password: password}),
           })
          let data = await res.json()

          if (res.status === 200) {
            setAuthTokens(data.tokens)
            setUserToken(jwt_decode(data.tokens.access))
            localStorage.setItem('authTokens', JSON.stringify(data.tokens))
            console.log('Passed', res.status)

            console.log(jwt_decode(data.tokens.access))
            const uid = jwt_decode(data.tokens.access).user_id
            let response = await fetch(`${proxy}/auth/user/${uid}`)
            let loggedUser = await response.json()
            setLogged(loggedUser)
            navigate('/');
          }
          // if (errorDetails==='Email is not verified'){
          //   login_warning.innerHTML= data.detail + '<a href="/register">.<br/> Kindly check your inbox or click here to send a new token.</a>'
          // }
          if (res.status !== 200) {
            console.log('Failed', res.status)
            console.log('response: ',data)
            login_warning.innerHTML= (data.detail)
          }
        }  
     }

    //Logout user
    let logout = () => {
      setAuthTokens(null)
      setUserToken(null)
      localStorage.removeItem('authTokens')
      window.location.reload(false)
    }

    //Refreshing the tokens 
    let updateToken = async () => {
      console.log('update called')

      let res = await fetch(`${proxy}/auth/api/token/refresh/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'refresh': authTokens?.refresh}) ,
      })
      let data = await res.json()

      if (res.status === 200) {
        setAuthTokens(data)
        setUserToken(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
      }else{
        logout()
      }

      if(loading){
        setLoading(false)
      }
    }

    let contextData ={
      userToken: userToken,
      authTokens:authTokens,
      logged:logged,
      logout:logout,
      registerUser:registerUser,
      loginUser:loginUser
    }

    useEffect(()=>{

      if(loading){
        updateToken()
      }

      let timeOut = 1000*60*4
      let interval = setInterval(()=>{
        if(authTokens){
          updateToken()
        }
      }, timeOut)
      return ()=>clearInterval(interval)
    }, [authTokens, loading])

   
    return (
        <AuthContext.Provider value={contextData}>
            {loading? null: children}
            <Outlet />
        </AuthContext.Provider>
    )
}