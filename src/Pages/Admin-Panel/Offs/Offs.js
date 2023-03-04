import React from 'react'
import ErrorBox from '../../../Components/ErrorBox/ErrorBox'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Header from '../../../Components/Header/Header'


export default function Offs() {
  return (
    <>
      <Sidebar />
      <div className="main d-flex flex-column m-1 p-3 p-md-4 ">
        <Header />
        <ErrorBox msg="هیچ کد تخفیفی یافت نشد!" />
        <div />
      </div>
    </>
  )
}