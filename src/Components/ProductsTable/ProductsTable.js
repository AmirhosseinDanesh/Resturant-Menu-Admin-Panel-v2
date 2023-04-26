import React, { useEffect, useState } from 'react'
import "./ProductsTable.css"
import EditModal from '../../Components/EditModal/EditModal';
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import Data from '../../Data/Data';
import swal from 'sweetalert';

export default function ProductsTable({ getAllProducts, allProducts }) {
    const [isShowEditModal, setIsShowEditModal] = useState(false)
    const [productID, setProductID] = useState(null)
    const [categories, setCategories] = useState([]);

    const [productsNewName, setProductsNewName] = useState("")
    const [productsNewPrice, setProductsNewPrice] = useState("")
    const [productsNewShortName, setProductsNewShortName] = useState("")
    const [productsNewCover, setProductsNewCover] = useState("")
    const [productsNewdescription, setProductsNewdescription] = useState("")
    const [productsNewCategory, setProductsNewCategory] = useState("")
    const [productNewStatus, setProductNewStatus] = useState("")

    let updateWithButton = (status,id, name, description, shortName, price, cover, catID) => {
        swal({
            title: " آیا از تفییر وضعیت محصول مطمعن هستید؟",
            buttons: ["خیر", "بله"]
        }).then(res => {
            if (res) {
                const productNewData = {
                    name,
                    description,
                    shortName,
                    cover,
                    price,
                    categoryID: catID,
                    status: status
                }



                fetch(`${Data.url}/courses/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${LocalStorageData.token}`
                    },
                    body: JSON.stringify(productNewData)
                }).then(res => res.json())
                    .then(result =>{
                        getAllProducts()
                    })
            }
        })



    }



    useEffect(() => {
        getAllProducts()

        fetch(`${Data.url}/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });
    }, [productsNewCategory]);




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
        console.log(productsNewCategory)
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
            status: productNewStatus
        }

        

        fetch(`${Data.url}/courses/${productID}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${LocalStorageData.token}`
            },
            body: JSON.stringify(productNewData)
        }).then(res => res.json())
            .then(result => {
                closeEditModal()
                getAllProducts()
            })




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
                                    <th className='fw-bold'>وضعیت</th>
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
                                                {
                                                    pr.status === "start" ? (
                                                        <span className='stock-status' />
                                                    ) : (
                                                        <span className='outstock-status' />
                                                    )
                                                }
                                            </td>
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
                                                {pr.categoryID.title}
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
                                                        setProductNewStatus(pr.status)
                                                    }}
                                                    >ویرایش</button>
                                                    {
                                                        pr.status === "start" ? (
                                                            <button className='btn btn-danger' onClick={() => {
                                                                setProductID(pr._id)
                                                                setProductsNewName(pr.name)
                                                                setProductsNewdescription(pr.description)
                                                                setProductsNewShortName(pr.shortName)
                                                                setProductsNewPrice(pr.price)
                                                                setProductsNewCover(pr.cover)
                                                                setProductsNewCategory(pr.categoryID._id)
                                                                updateWithButton("presell",pr._id,pr.name,pr.description,pr.shortName,pr.price,pr.cover,pr.categoryID._id)
                                                            }}>
                                                                ناموجود کردن
                                                            </button>
                                                        ) : (
                                                            <button className='btn btn-success' onClick={() => {
                                                                setProductID(pr._id)
                                                                setProductsNewName(pr.name)
                                                                setProductsNewdescription(pr.description)
                                                                setProductsNewShortName(pr.shortName)
                                                                setProductsNewPrice(pr.price)
                                                                setProductsNewCover(pr.cover)
                                                                setProductsNewCategory(pr.categoryID._id)
                                                                updateWithButton("start",pr._id,pr.name,pr.description,pr.shortName,pr.price,pr.cover,pr.categoryID._id)
                                                            }}>
                                                                موجود کردن
                                                            </button>
                                                        )
                                                    }
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
                                <option value={-1}>انتخاب کنید</option>
                                {
                                    categories.map(ct => (
                                        <option value={ct._id} selected={ct._id === productsNewCategory}>
                                            {ct.title}
                                        </option>
                                    ))
                                }

                            </select>
                        </div>
                        
                    </div>
                </EditModal>
            }
        </>

    )
}
