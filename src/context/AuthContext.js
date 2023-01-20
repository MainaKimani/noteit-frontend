import React from 'react'
import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthContext = createContext({})

export default AuthContext;


export const AuthProvider = ({children}) => {

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

    //log in functionality
    let loginUser= async (event) => {
        event.preventDefault();
        const credentials = new FormData(event.currentTarget);
        const email = credentials.get('email');
        const password = credentials.get('password');

        console.log(email, password);

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
         }
        else{
          console.log('Input checks passed. Pushing to server...')
          //push to api's endpoint
          let res = await fetch(`auth/login/`, {
             method: "POST",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
              email: email,
              password: password}),
            credentials: 'include',
           })
          let data = await res.json()

          if (res.status === 200) {
            setAuthTokens(data.tokens)
            setUserToken(jwt_decode(data.tokens.access))
            localStorage.setItem('authTokens', JSON.stringify(data.tokens))

            console.log(jwt_decode(data.tokens.access))
            const uid = jwt_decode(data.tokens.access).user_id
            let response = await fetch(`/auth/user/${uid}`)
            let loggedUser = await response.json()
            setLogged(loggedUser)
            
            navigate('/');
          }else{
            console.log(res.status)
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

      let res = await fetch(`/auth/api/token/refresh/`, {
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
      logged,logged,
      logout:logout,
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