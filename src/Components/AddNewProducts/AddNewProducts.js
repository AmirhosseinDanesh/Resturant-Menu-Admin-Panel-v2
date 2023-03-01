import React, { useState } from 'react'
import Data from '../../Data/Data';

export default function AddNewProducts({ getAllProducts }) {
    const [newProductsTitle, setNewProductsTitle] = useState("")
    const [newProductsPrice, setNewProductsPrice] = useState("")
    const [newProductsCount, setNewProductsCount] = useState("")
    const [newProductsImg, setNewProductsImg] = useState("")
    const [newProductsPopularity, setNewProductsPopularity] = useState("")
    const [newProductsSale, setNewProductsSale] = useState("")
    const [newProductsColors, setNewProductsColors] = useState("")
    const [newProductsdescript, setNewProductsdescript] = useState("")

    const newProductData = {
        title: newProductsTitle,
        price: newProductsPrice,
        count: newProductsCount,
        img: newProductsImg,
        popularity: newProductsPopularity,
        sale: newProductsSale,
        colors: newProductsColors,
        descript: newProductsdescript,
    }
    const emptyInput = () => {
        setNewProductsTitle("")
        setNewProductsPrice("")
        setNewProductsCount("")
        setNewProductsImg("")
        setNewProductsPopularity("")
        setNewProductsSale("")
        setNewProductsColors("")
        setNewProductsdescript("")
    }
    const addNewProduct = (event) => {
        event.preventDefault()
        fetch(`${Data.url}/products/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newProductData)
        }).then(res => res.json())
            .then(result => {
                getAllProducts()
                emptyInput()
            })
    }

    return (
        <form action="#">
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="نام محصول" value={newProductsTitle} onChange={(e) => { setNewProductsTitle(e.target.value) }} />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="قیمت محصول" value={newProductsPrice} onChange={(e) => { setNewProductsPrice(e.target.value) }} />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1 d-flex justify-content-end">
                    <input type="text" className="form-control" placeholder="توضیحات محصول" value={newProductsdescript} onChange={(e) => { setNewProductsdescript(e.target.value) }} />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="تصویر محصول" value={newProductsImg} onChange={(e) => { setNewProductsImg(e.target.value) }} />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="موجودی محصول" value={newProductsCount} onChange={(e) => { setNewProductsCount(e.target.value) }} />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="میزان فروش" value={newProductsSale} onChange={(e) => { setNewProductsSale(e.target.value) }} />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="رنگ محصول" value={newProductsColors} onChange={(e) => { setNewProductsColors(e.target.value) }} />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <input type="text" className="form-control" placeholder="محبوبیت محصول" value={newProductsPopularity} onChange={(e) => { setNewProductsPopularity(e.target.value) }} />
                </div>
            </div>
            <div className="form-group d-flex justify-content-center">
                <button  className='btn pr-submit-btn text-white bg-primary' onClick={addNewProduct}>
                    ثبت
                </button>
            </div>

        </form>
    )
}
