import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useEffect, useState } from 'react';


const Header = () => {

  let {logged, userToken, logout} = useContext(AuthContext)

  let [user, setUser] = useState()

  let getUserInfo = async() => {
    if (userToken===null) {
      return
    }
    const uid = userToken.user_id
    let response = await fetch(`/auth/user/${uid}`)
    let user = await response.json()
    setUser(user)
  }

  useEffect(() => { 
    getUserInfo()
    }, [])


  return (
    <div className = "app-header">
      <h1><Link to="/">Note It</Link></h1> 
      {user && 
      <div className= 'tab'>
        <p>{user.username}</p>
        <span>  |  </span>
        <Link onClick={logout}>Log Out</Link>
      </div>
      }
      {logged && 
      <div className= 'tab'>
        <p>Welcome back {logged.username}</p>
        <span>  |  </span>
        <Link onClick={logout}>Log Out</Link>
      </div>
      }
    </div>
  )
}

export default Header