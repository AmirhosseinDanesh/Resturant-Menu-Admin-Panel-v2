import React from 'react'
import { useRoutes } from 'react-router-dom'


import routes from './Routes/routes'


import "./App.css"

export default function App() {
  const router = useRoutes(routes)
  return (
    <>
      {router}

    </>
  )
}
