import React, { useEffect } from 'react'
import "./EditModal.css"
export default function EditModal({ onHide, submit , children }) {
    useEffect(() => {
        var modal = document.querySelector('.modal');
        const escape = (e) => {
            if (e.keyCode === 27) {
                onHide()
            }
        }
        window.addEventListener("keydown", escape)

        const clickOnSpace = (event) => {
            if (event.target === modal) {
                onHide()
            }
        }
        window.addEventListener("click", clickOnSpace)

        return () => {

            window.removeEventListener("keydown", escape)
            window.removeEventListener("click", clickOnSpace)

        }
    })

    return (
        <div className="modal show fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">اطلاعات جدید را وارد کنید</h5>
                        <button type="button" className="close btn" aria-label="Close" onClick={() => onHide()}>
                            <span className='close-modal' aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-footer">
                        <form className='w-100'>
                            {children}
        
                            <div className="form-group  p-1 d-flex justify-content-center">
                                <button className='btn pr-submit-btn text-white bg-primary' onClick={(event) => submit(event.preventDefault())}>
                                    ثبت
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
