import React, { useState, useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Header from '../../../Components/Header/Header'
import CategoryTable from '../../../Components/CategoryTable/CategoryTable'
import Data from '../../../Data/Data'
import AddNewCategory from '../../../Components/AddNewCategory/AddNewCategory'


export default function Category() {
    const [allCategory, setAllCategory] = useState([])

    useEffect(() => {
        getAllCategory()
    }, [])

    const getAllCategory = () => {
        fetch(`${Data.url}/category/`)
            .then(res => res.json())
            .then(category => {
                setAllCategory(category)
            })

    }



    return (
        <>
            <Sidebar />
            <div className="main d-flex flex-column m-1 p-3 p-md-4 ">
                <Header />

                <div className='mt-3'>
                    <AddNewCategory getAllCategory={getAllCategory} />
                </div>
                <div className="mt-3">
                    <CategoryTable allCategory={allCategory} getAllCategory={getAllCategory} />
                </div>
                <div />
            </div>

        </>
    )
}
