import React, { useEffect, useState } from 'react'
import Data from '../../Data/Data';
import "./AddNewProducts.css"
import swal from 'sweetalert';
import { useForm } from '../../Hooks/useForm';
import Input from '../Forms/Input';
import { requiredValidator, minValidator, maxValidator } from "../../Validator/rules"

export default function AddNewProducts({ getAllProducts }) {
    const [courses, setCourses] = useState([]);
    const [courseCategory, setCourseCategory] = useState("-1");
    const [categories, setCategories] = useState([]);
    const [courseStatus, setCourseStatus] = useState("start");
    const [courseCover, setCourseCover] = useState({});

    const [formState, onInputHandler] = useForm(
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
        getAllCourses();
        console.log(courseStatus)
        fetch(`${Data.url}/category`)
            .then((res) => res.json())
            .then((allCategories) => {
                setCategories(allCategories);
            });
    }, []);

    function getAllCourses() {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        fetch(`${Data.url}/courses`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`,
            },
        })
            .then((res) => res.json())
            .then((allCourses) => {
                console.log(allCourses);
                setCourses(allCourses);
            });
    }

    const removeCourse = (courseID) => {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
            title: "آیا از حذف محصول اطمینان داری؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            if (result) {
                fetch(`http://localhost:4000/v1/courses/${courseID}`, {
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
                            getAllCourses();
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

    const selectCategory = (event) => {
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
        formData.append("support", formState.inputs.name.value);
        formData.append("status", courseStatus);
        formData.append("cover", courseCover);

        if (courseCategory === "-1") {
            swal({
                title: "لطفا دسته بندی محصول را انتخاب کنید",
                icon: "error",
            });
        } else {
            fetch(`http://localhost:4000/v1/courses`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorageData.token}`,
                },
                body: formData,
            }).then((res) => {
                console.log(res);
                if (res.ok) {
                    swal({
                        title: "محصول جدید با موفقیت اضافه شد",
                        icon: "success",
                        buttons: "اوکی",
                    }).then(() => {
                        getAllCourses();
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
                        placeholder="لطفا توضیحات دوره را وارد کنید..."
                        className="form-control"

                    />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">لینک</label>
                    <Input
                        id="shortName"
                        element="input"
                        onInputHandler={onInputHandler}
                        validations={[minValidator(5)]}
                        type="text"
                        isValid="false"
                        placeholder="لطفا لینک دوره را وارد کنید..."
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
                        placeholder="لطفا قیمت دوره را وارد کنید..."
                        className="form-control"

                    />
                </div>
            </div>
            <div className="form-row d-flex justify-content-around mt-2 mt-md-3">
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">دسته بندی محصول</label>
                    <select className="form-select" onChange={selectCategory}>
                        {
                            categories.map(ct => (
                                <option key={ct._id} value={ct._id}>{ct.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group col-md-5 col-6 p-1">
                    <label className="form-label fw-bold">عکس دوره</label>
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
