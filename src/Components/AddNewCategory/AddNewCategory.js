import React, { useState } from 'react'
import Data from '../../Data/Data';
import "./AddNewCategory.css"

export default function AddNewCategory({ getAllCategory }) {
    const [newCategoryTitle, setNewCategoryTitle] = useState("")
    const [newCategoryName, setNewCategoryName] = useState("")


    const newCategoryData = {
        title: newCategoryTitle,
        name: newCategoryName,

    }
    const emptyInput = () => {
        setNewCategoryTitle("")
        setNewCategoryName("")

    }
    const addNewCategory = (event) => {
        event.preventDefault()
        const LocalStorageData = JSON.parse(localStorage.getItem("user"))

        fetch(`${Data.url}/category/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${LocalStorageData.token}`
            },
            body: JSON.stringify(newCategoryData)
        }).then(res => res.json())
            .then(result => {
                getAllCategory()
                emptyInput()
            })
    }

    return (
        <form action="#">
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <label className='input-label'> نام دسته بندی</label>
                    <input type="text" className="form-control" placeholder="تست (فارسی)" value={newCategoryTitle} onChange={(e) => { setNewCategoryTitle(e.target.value) }} />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <label className='input-label'>لینک دسته بندی</label>
                    <input type="text" className="form-control" placeholder="test (انگلیسی)" value={newCategoryName} onChange={(e) => { setNewCategoryName(e.target.value) }} />
                </div>
            </div>
            <div className="form-group d-flex justify-content-center">
                <button className='btn pr-submit-btn text-white bg-primary' onClick={addNewCategory}>
                    ثبت
                </button>
            </div>

        </form>
    )
}
