import React, { useCallback, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import authContext from './Contexts/authContext'
import Data from './Data/Data'
import routes from './Routes/routes'

import "./App.css"

export default function App() {
  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false)
  const [userInfo, setUserInfo] = useState(false)

  const login = useCallback((userInfo, token) => {
    setToken(token)
    setUserInfo(userInfo)
    localStorage.setItem("user", JSON.stringify({ token }))
    setIsLoggedIn(true)
  },[])
  const logout = useCallback(() => {
    setToken(null)
    setUserInfo({})
    localStorage.removeItem("user")
    setIsLoggedIn(false);
  },[])

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    if (localStorageData) {
      fetch(`${Data.url}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        }
      }).then(res => res.json())
        .then(userData => {
          setIsLoggedIn(true)
          setUserInfo(userData)
        })
    }else{
      setIsLoggedIn(false)
    }
  }, [login , logout]);
  return (
    <authContext.Provider value={{
      isLoggedIn,
      token,
      userInfo,
      login,
      logout,
    }}>
      {router}
    </authContext.Provider >
  )
}

