import { useEffect } from 'react'
import ReactDOM from 'react-dom'

import "./DeleteModal.css"
export default function DeleteModal({ cancel, submit , title }) {
    
    useEffect(() => {
        var modal = document.querySelector('.modal');
        const escape = (e) => {
            if (e.keyCode === 27) {
                cancel()
            }
        }
        
        window.addEventListener("keydown", escape)

        const clickOnSpace = (event) => {
            if (event.target === modal) {
                cancel()
            }
        }
        window.addEventListener("click", clickOnSpace)

        return () => {

            window.removeEventListener("keydown", escape)
            window.removeEventListener("click", clickOnSpace)

        }
    },[])

    return ReactDOM.createPortal(
        <div className="modal show fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">{title}</h5>
                        <button type="button" className="close btn" aria-label="Close">
                            <span className='close-modal' aria-hidden="true" onClick={() => cancel()}>&times;</span>
                        </button>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => submit()}>بله</button>
                        <button type="button" className="btn btn-secondary" onClick={() => cancel()}>خیر</button>
                    </div>
                </div>
            </div>
        </div>
        , document.querySelector("#modal-parent")
    )
}
