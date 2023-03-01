import React from 'react'
import Alert from 'react-bootstrap/Alert';

import "./ErrorBox.css"

export default function ErrorBox({msg}) {
    return (
        <Alert key="danger" variant="danger" className='fw-bold text-center alert-text mt-2 mt-md-3'>
            {msg}
        </Alert>
    )
}
