import React, { useState, useEffect } from 'react'
import AddNewProducts from "../../../Components/AddNewProducts/AddNewProducts"
import ProductsTable from '../../../Components/ProductsTable/ProductsTable'
import "./Products.css"
import Data from "../../../Data/Data"
import Sidebar from '../../../Components/Sidebar/Sidebar'
import Header from '../../../Components/Header/Header'
export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {
    getAllProducts()
  }, [])

  const getAllProducts = () => {
    fetch(`${Data.url}/courses/`)
      .then(res => res.json())
      .then(products => {
        setAllProducts(products)
      })

  }

  return (
    <>
      <Sidebar />
      <div className="main d-flex flex-column m-1 p-3 p-md-4 ">
        <Header />

        <div className='mt-3'>
          <AddNewProducts getAllProducts={getAllProducts} />
        </div>
        <div className="mt-3">
          <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
        </div>
        <div />
      </div>

    </>
  )
}
