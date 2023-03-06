import React, { useState, useEffect } from 'react'
import ErrorBox from '../ErrorBox/ErrorBox'
import swal from 'sweetalert'
import Data from '../../Data/Data'
export default function CategoryTable({ allCategory, getAllCategory }) {
    
    
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))
    const removeCategory = (id) => {
        swal({
            title: "آیا از حذف دسته بندی مورد نظر مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then(res => {
            fetch(`${Data.url}/category/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${LocalStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(result => {
                    swal({
                        title: "با موفقیت حذف شد"
                    })
                        .then(() => [
                            getAllCategory()
                        ])
                })
        })
    }

    const updateCategory = (id , title)=>{
        swal({
            title:"عنوان جدید را وارد کنید",
            content: {
                element: "input",
                attributes: {
                  placeholder: `${title}`,
                },
              },
            buttons : "ثبت"
        }).then(res=>{
            if(res.trim().length){
                fetch(`${Data.url}/category/${id}` , {
                    method : "PUT",
                    headers:{
                        "Content-Type" : "application/json",
                        'Authorization': `Bearer ${LocalStorageData.token}`
                    },
                    body : JSON.stringify({title : res})

                })
                .then(res=>res.json())
                .then(result=>{
                    swal({
                        title : "با موفقیت ویرایش شد"
                    }).then(()=>{
                        getAllCategory()
                    })
                })
            }
        })
    }

    return (
        <div className='mt-3 '>
            <div className="table-responsive">
                {
                    allCategory.length ? (<table className="table  text-center">
                        <thead>
                            <tr>
                                <th className='fw-bold'>شناسه</th>
                                <th className='fw-bold'>نام</th>
                                <th className='fw-bold'>عنوان</th>
                                <th className='fw-bold'>ویرایش</th>
                                <th className='fw-bold'> حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allCategory.map((ct, index) => (
                                    <tr key={ct._id} style={{ verticalAlign: "middle" }}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {ct.name}
                                        </td>
                                        <td>
                                            {ct.title}
                                        </td>
                                        <td>
                                            <button className="btn text-white ms-2 btn-sm btn-primary" onClick={() => { updateCategory(ct._id,ct.title)}}
                                            >ویرایش</button>
                                        </td>
                                        <td>
                                            <button className="btn text-white ms-2 btn-sm btn-danger" onClick={() => { removeCategory(ct._id) }}>حذف</button>
                                        </td>
                                    </tr>
                                )).reverse()
                            }

                        </tbody>
                    </table>) : (
                        <ErrorBox msg="هیچ محصولی یافت نشد!" />
                    )
                }
            </div>
        </div>
    )
}
