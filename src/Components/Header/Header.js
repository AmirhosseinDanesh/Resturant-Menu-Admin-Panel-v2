import React, { useContext, useState } from 'react'
import "./Header.css"
import { AiOutlineBell } from "react-icons/ai"
import { FiSettings } from "react-icons/fi"
import { GiExitDoor } from "react-icons/gi"
import { MdOutlineDarkMode } from "react-icons/md"
import { HiOutlineSun } from "react-icons/hi"

import authContext from '../../Contexts/authContext'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

export default function Header() {
    const [theme, setTheme] = useState(false)
    const auth = useContext(authContext)
    const navigate = useNavigate()
    const logoutHandler = () => {
        swal({
            title: "خارج شدید"
        }).then(() => {
            auth.logout()
            navigate("/login")
        })
    }

    return (
        <>
            <div className='header d-flex justify-content-between align-items-md-center flex-column flex-md-row'>
                <div className='d-flex justify-content-between align-items-center col-md-2'>
                    <div>
                        <button className="btn">
                            <AiOutlineBell className='hd-icons' />
                        </button>
                    </div>
                    <div>
                        <button className='btn'>
                            <FiSettings className='hd-icons' />
                        </button>
                    </div>
                    <div>
                        <button className="btn">
                            {
                                theme ? (
                                    <HiOutlineSun className='hd-icons' onClick={() => {
                                        document.querySelector("body").setAttribute("data", "dark")
                                        setTheme(false)
                                    }} />

                                ) : (
                                    <MdOutlineDarkMode className='hd-icons' onClick={() => {
                                        document.querySelector("body").setAttribute("data", "")
                                        setTheme(true)
                                    }} />
                                )
                            }
                        </button>
                    </div>
                    <div>
                        <button className="btn d-block d-md-none">
                            <GiExitDoor className='hd-icons ' />
                        </button>
                    </div>
                </div>
                <div className='mt-3 mt-md-0 col-md-6'>
                    <div className="searchbox">
                        <input className='hd-input w-100' type="text" placeholder='نام کاربر ، شماره سفارش و ...' />
                        <button className='hd-input-btn'>جستجو</button>
                    </div>
                </div>
                <button className='btn d-none d-md-block'>
                    <GiExitDoor className='hd-icons ' onClick={() => {
                        logoutHandler()
                    }} />
                </button>
            </div>
        </>
    )
}
