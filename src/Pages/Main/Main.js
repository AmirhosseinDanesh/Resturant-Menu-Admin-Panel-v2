import React from 'react'
import MainInfos from '../../Components/MainInfos/MainInfos'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Header from '../../Components/Header/Header'

export default function Main() {
  return (
    <>
    <Sidebar />
      <div className="main d-flex flex-column m-1 p-3 p-md-4 ">
        <Header />
        <MainInfos />
      </div>
    </>
  )
}
