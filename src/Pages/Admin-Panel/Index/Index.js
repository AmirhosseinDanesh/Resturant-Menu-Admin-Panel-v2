import React from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Header from '../../../Components/Header/Header'
import { Outlet } from 'react-router-dom'

export default function Index() {
    return (
        <>


            <Sidebar />
            <div className="main d-flex flex-column m-1 p-3 p-md-4 ">
                <Header />

            </div>
        </>

    )
}
