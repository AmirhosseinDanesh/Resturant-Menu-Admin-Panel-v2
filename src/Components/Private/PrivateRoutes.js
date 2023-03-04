import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authContext from '../../Contexts/authContext'

export default function PrivateRoutes({ children }) {
    const auth = useContext(authContext)
    const navigate = useNavigate()

    useEffect(() => {
        // auth.userInfo.role === 'ADMIN' ?
        //     (<> {children} </>)
        //     :
        //     (navigate("/login"))
    }, [])

    return (
        <>
            {
                auth.userInfo.role === 'ADMIN' ?
                (<> {children} </>)
                :
                (navigate("/login"))
            }
        </>
    )
}
