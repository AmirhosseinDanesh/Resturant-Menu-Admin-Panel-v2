import React, { useEffect, useState } from 'react'
import "./ProductsTable.css"
import DeleteModal from "../../Components/DeleteModal/DeleteModal"
import DetailModals from '../DetailModals/DetailModals'
import EditModal from '../../Components/EditModal/EditModal';
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import Data from '../../Data/Data';
import swal from 'sweetalert';
export default function ProductsTable({ getAllProducts, allProducts }) {
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [productsNewName, setProductsNewName] = useState("")
    const [productsNewPrice, setProductsNewPrice] = useState("")
    const [productsNewShortName, setProductsNewShortName] = useState("")
    const [productsNewCover, setProductsNewCover] = useState("")
    const [productsNewdescription, setProductsNewdescription] = useState("")
    const [productsNewCategory, setProductsNewCategory] = useState("")
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${Data.url}/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });
    })

    const removeCourse = (courseID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
            title: "آیا از حذف محصول اطمینان داری؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`${Data.url}/courses/${courseID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorageData.token}`,
                    },
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "محصول موردنظر با موفقیت حذف شد",
                            icon: "success",
                            buttons: "اوکی",
                        }).then(() => {
                            getAllProducts();
                        });
                    } else {
                        swal({
                            title: "حذف محصول با مشکلی مواجه شد",
                            icon: "error",
                            buttons: "اوکی",
                        });
                    }
                });
            }
        });
    };


    const selectNewCategory = (event) => {
        setProductsNewCategory(event.target.value);
    };
    const closeEditModal = () => {
        setIsShowEditModal(false)
    }
    const LocalStorageData = JSON.parse(localStorage.getItem("user"))

    const submitEditModal = () => {

        const productNewData = {
            name: productsNewName,
            description: productsNewdescription,
            shortName: productsNewShortName,
            cover: productsNewCover,
            price: productsNewPrice,
            categoryID: productsNewCategory,
        }

        console.log(productNewData)

        fetch(`${Data.url}/courses/${productID}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${LocalStorageData.token}`
            },
            body: JSON.stringify(productNewData)
        }).then(res => { console.log(res) })
        //     .then(result => {
        //      
        //         getAllProducts()
        //     })


    }

    const sortedProducts = (allProducts.sort((a, b) => a.shortName - b.shortName)).reverse()
    return (
        <>
            <div className='mt-3 '>
                <div className="table-responsive">
                    {
                        sortedProducts.length ? (<table className="table  text-center">
                            <thead>
                                <tr>
                                    <th className='fw-bold'>عکس</th>
                                    <th className='fw-bold'>اسم</th>
                                    <th className='fw-bold'>جایگاه</th>
                                    <th className='fw-bold'>قیمت</th>
                                    <th className='fw-bold'>دسته بندی</th>
                                    <th className='fw-bold'>توضیحات</th>
                                    <th className='fw-bold'>عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allProducts.map((pr) => (
                                        <tr key={pr._id} style={{ verticalAlign: "middle" }}>
                                            <td>
                                                <img className='tb-pr-img' src={`${Data.urlnotV1}/courses/covers/${pr.cover}`} alt="" />
                                            </td>
                                            <td>
                                                {pr.name}
                                            </td>
                                            <td>
                                                {pr.shortName}
                                            </td>
                                            <td>
                                                {pr.price.toLocaleString()}
                                            </td>
                                            <td>
                                                {pr.categoryID}
                                            </td>
                                            <td>
                                                {pr.description}
                                            </td>
                                            <td>
                                                <div className='d-flex justify-content-center'>
                                                    <button className="btn text-white ms-2 btn-sm btn-danger" onClick={() => {
                                                        setProductID(pr._id)
                                                        removeCourse(pr._id)
                                                    }}>حذف</button>
                                                    <button className="btn text-white ms-2 btn-sm btn-primary" onClick={() => {
                                                        setIsShowEditModal(true)
                                                        setProductID(pr._id)
                                                        setProductsNewName(pr.name)
                                                        setProductsNewdescription(pr.description)
                                                        setProductsNewShortName(pr.shortName)
                                                        setProductsNewPrice(pr.price)
                                                        setProductsNewCover(pr.cover)
                                                        setProductsNewCategory(pr.categoryID)
                                                    }}
                                                    >ویرایش</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )).reverse()
                                }

                            </tbody>
                        </table>
                        ) : (
                            <ErrorBox msg="هیچ محصولی یافت نشد!" />
                        )
                    }
                </div>
            </div>


            {
                isShowEditModal && <EditModal onHide={closeEditModal} submit={submitEditModal} >
                    <div className="form-row d-flex justify-content-center flex-wrap mt-2 mt-md-3">
                        <div className="form-group col-md-5 col-6 p-1">
                            <label className="form-label fw-bold">نام جدید</label>
                            <input type="text" className="form-control" placeholder="نام محصول" value={productsNewName} onChange={(event) => {
                                setProductsNewName(event.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-5 col-6 p-1">
                            <label className="form-label fw-bold">توضیحات جدید</label>
                            <input type="text" className="form-control" placeholder="توضیحات محصول" value={productsNewdescription} onChange={(event) => {
                                setProductsNewdescription(event.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-5 col-6 p-1">
                            <label className="form-label fw-bold">قیمت جدید</label>
                            <input type="text" className="form-control" placeholder="قیمت محصول" value={productsNewPrice.toLocaleString()} onChange={(event) => {
                                setProductsNewPrice(event.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-5 col-6 p-1">
                            <label className="form-label fw-bold">تصویر جدید</label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                onChange={(event) => {
                                    setProductsNewCover(event.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="form-group col-md-5 col-6 p-1">
                            <label className="form-label fw-bold">جایگاه جدید</label>
                            <input type="text" className="form-control" placeholder="جایگاه محصول" value={productsNewShortName} onChange={(event) => {
                                setProductsNewShortName(event.target.value)
                            }} />
                        </div>
                        <div className="form-group col-md-5 col-6 p-1">
                            <label className="form-label fw-bold">دسته بندی جدید</label>
                            <select className="form-select" onChange={selectNewCategory}>
                                {
                                    categories.map(ct => (
                                        <option key={ct._id} value={ct._id}>{ct.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-5 col-6 p-1">
                        </div>
                    </div>
                </EditModal>
            }
        </>

    )
}
