import React, { useContext, useEffect } from 'react';
import "./Login.css";
import Data from "../../Data/Data";
import Input from '../../Components/Forms/Input';
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validator/rules";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from '../../Hooks/useForm';
import Button from "../../Components/Forms/button";
import authContext from '../../Contexts/authContext';
import swal from "sweetalert";

export default function Login() {
    const auth = useContext(authContext);
    const navigate = useNavigate();
    const [formState, onInputHandler] = useForm(
        {
            username: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );



    const userLogin = async (event) => {
        event.preventDefault();

        const userData = {
            identifier: formState.inputs.username.value,
            password: formState.inputs.password.value,
        }

        try {
            const res = await fetch(`${Data.url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!res.ok) {
                throw new Error('همچین کاربری وجود ندارد');
            }

            const result = await res.json();

            swal({
                title: "با موفقیت لاگین شدید",
                icon: "success",
                buttons: "ورود به پنل",
            }).then(() => {
                auth.login({}, result.accessToken);
                navigate("/p-admin/");
            });

        } catch (err) {
            swal({
                title: err.message,
                icon: "error",
                buttons: "تلاش دوباره",
            })
        }
    };

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate("/p-admin/");
        }
    }, [auth.isLoggedIn, navigate]);
    return (
        <>
            <div className="loginformbg col-12 d-flex justify-content-center">
                <div className="loginform col-md-4 ">
                    <h5 className='text-center mb-5'>
                        ورود
                    </h5>
                    <form onSubmit={userLogin}>
                        <div className="form-group mb-3">
                            <label className='input-label'>ایمیل یا نام کابری</label>
                            <Input
                                id="username"
                                type="email"
                                className="form-control"
                                placeholder='example@gmail.com'
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(30),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className='input-label' placeholder='خود را وارد کنید'>رمز عبور</label>
                            <Input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder='********'
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(18),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" element="input" />
                            <label className="form-check-label">مرا به خاطر بسپار</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between ">
                            <Button
                                className={`submitbtn-login btn fw-bold ${(formState.isFormValid)
                                    ? "btn-success"
                                    : "btn-danger"
                                    }`}
                                type="submit"
                                disabled={!formState.isFormValid}
                            >
                                ورود
                            </Button>

                            <NavLink to="/register" className="text-white text-decoration-none">
                                <button type="button" className="submitbtn-login btn btn-danger">اگر حساب کاربری <span className='fw-bold'>ندارید</span> کلیک کنید</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
