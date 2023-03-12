import React, { useEffect, useState } from 'react'
import Data from '../../Data/Data';
import "./AddNewProducts.css"
import swal from 'sweetalert';
import { useForm } from '../../Hooks/useForm';
import Input from '../Forms/Input';
import { requiredValidator, minValidator, maxValidator } from "../../Validator/rules"

export default function AddNewProducts({ getAllProducts }) {

    const [courseCategory, setCourseCategory] = useState("-1");
    const [categories, setCategories] = useState([]);
    const [courseStatus, setCourseStatus] = useState("start");
    const [courseCover, setCourseCover] = useState({});

    const [formState, onInputHandler, resetForm] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            shortName: {
                value: "",
                isValid: false,
            },
            price: {
                value: "",
                isValid: false,
            },
            support: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        getAllProducts()
        if (categories.length === 0) {
            fetch(`${Data.url}/category`)
                .then((res) => res.json())
                .then((allCategories) => {
                    setCategories(allCategories);
                });
        }
    }, [setCategories]);

    const emptyInput = () => {
        resetForm(); // حذف پارامتر
    }




    const selectCategory = (event) => {
        console.log(courseCategory)
        setCourseCategory(event.target.value);
    };

    const addNewCourse = (event) => {
        event.preventDefault();
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        let formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("shortName", formState.inputs.shortName.value);
        formData.append("categoryID", courseCategory);
        formData.append("price", formState.inputs.price.value);
        formData.append("support", formState.inputs.support.value);
        formData.append("status", courseStatus);
        formData.append("cover", courseCover);

        if (courseCategory === "-1") {
            swal({
                title: "لطفا دسته بندی محصول را انتخاب کنید",
                icon: "error",
            });
        } else {
            fetch(`${Data.url}/courses/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorageData.token}`,
                },
                body: formData,
            }).then((res) => {
                console.log(res)
                if (res.ok) {
                    swal({
                        title: "محصول جدید با موفقیت اضافه شد",
                        icon: "success",
                        buttons: "اوکی",
                    }).then(() => {
                        emptyInput();
                        getAllProducts();
                    });
                }
            });
        }
    };


    return (
        <form action="#">
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">نام محصول</label>
                    <Input
                        id="name"
                        element="input"
                        onInputHandler={onInputHandler}
                        validations={[minValidator(2)]}
                        type="text"
                        placeholder="لطفا نام محصول را وارد کنید..."
                        className="form-control"
                    />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">توضیحات</label>
                    <Input
                        id="description"
                        element="input"
                        onInputHandler={onInputHandler}
                        validations={[minValidator(5)]}
                        type="text"
                        placeholder="لطفا توضیحات محصول را وارد کنید..."
                        className="form-control"

                    />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">جایگاه</label>
                    <Input
                        id="shortName"
                        element="input"
                        onInputHandler={onInputHandler}
                        validations={[minValidator(1)]}
                        type="text"
                        isValid="false"
                        placeholder="لطفا جایگاه محصول را وارد کنید..."
                        className="form-control"

                    />
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">قیمت محصول</label>
                    <Input
                        id="price"
                        element="input"
                        onInputHandler={onInputHandler}
                        validations={[minValidator(5)]}
                        type="text"
                        isValid="false"
                        placeholder="لطفا قیمت محصول را وارد کنید..."
                        className="form-control"
                    />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">دسته بندی محصول</label>
                    <select className="form-select" onChange={selectCategory}>
                        <option value={-1}>انتخاب کنید</option>
                        {
                            categories.map(ct => (
                                <option key={ct._id} value={ct._id}>{ct.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">عکس محصول</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        onChange={(event) => {
                            setCourseCover(event.target.files[0]);
                        }}
                    />

                </div>
            </div>
            <div className="form-group d-flex justify-content-center">
                <button className='btn pr-submit-btn text-white bg-primary' onClick={addNewCourse}>
                    ثبت
                </button>
            </div>

        </form>
    )
}
