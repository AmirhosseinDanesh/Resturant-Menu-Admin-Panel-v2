import React, { useEffect } from 'react'
import "./DetailModals.css"

export default function DetailModals({ onHide ,children }) {
    useEffect(() => {
        var modal = document.querySelector('.modal');
        const escape = (e) => {
            if (e.keyCode === 27) {
                onHide()
            }
        }
        window.addEventListener("keydown", escape)
        
        const clickOnSpace = (event)=>{
            if (event.target === modal) {
                onHide()
            }
        }
        window.addEventListener("click", clickOnSpace)

        return () => {

            window.removeEventListener("keydown", escape)
            window.removeEventListener("click", clickOnSpace)
            
        }
    },[])
    return (
        <div className="modal show fade" tabIndex="-1" role="dialog" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold ">جزئیات</h5>
                                    <button type="button" className="close btn" onClick={() => onHide()}>
                                        <span className='close-modal' aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className='modal-body'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
    )
}
