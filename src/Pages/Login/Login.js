import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import Data from "../../Data/Data"
import Input from '../../Components/Forms/Input'
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validator/rules";
import { NavLink } from "react-router-dom"
import { useForm } from '../../Hooks/useForm';
import Button from "../../Components/Forms/button"
import authContext from '../../Contexts/authContext'
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
    const auth = useContext(authContext)
    const navigate = useNavigate()
    const [isCaptchaChecked, setIsCaptchaChecked] = useState(false)
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
    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate("/p-admin/");
        }
    }, [auth.isLoggedIn, navigate]);
    
    const userLogin = (event) => {
        event.preventDefault();

        const userData = {
            identifier: formState.inputs.username.value,
            password: formState.inputs.password.value,
        }

        fetch(`${Data.url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((text) => {
                        throw new Error(text);
                    });
                } else {
                    return res.json();
                }
            })
            .then((result) => {
                swal({
                    title: "با موفقیت لاگین شدید",
                    icon: "success",
                    buttons: "ورود به پنل",
                }).then(() => {
                    auth.login({}, result.accessToken);

                });
            })
            .catch((err) => {
                swal({
                    title: "همچین کاربری وجود ندارد",
                    icon: "error",
                    buttons: "تلاش دوباره",
                });
            });

    };

    const recaptchaHandler = () => {
        setIsCaptchaChecked(true)
    }

    return (
        <>
            <div className="loginformbg col-12 d-flex justify-content-center">
                <div className="loginform col-md-4 ">
                    <h5 className='text-center mb-5'>
                        ورود
                    </h5>
                    <form>
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
                                    // emailValidator()
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
                        {/* <div className="form-check captchadiv">
                            <ReCAPTCHA
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={recaptchaHandler}
                            />
                        </div> */}
                        <div className="d-flex align-items-center justify-content-between ">
                            <Button
                                className={`submitbtn-login btn fw-bold ${(formState.isFormValid)
                                    // className={`submitbtn-login btn fw-bold ${(formState.isFormValid && isCaptchaChecked)
                                    ? "btn-success"
                                    : "btn-danger"
                                    }`}
                                type="submit"
                                onClick={userLogin}
                                disabled={!formState.isFormValid}
                            // disabled={!formState.isFormValid || !isCaptchaChecked}
                            >
                                ورود
                            </Button>

                            <NavLink to="/register" className="text-white text-decoration-none">
                                <button type="submit" className="submitbtn-login btn btn-danger">اگر حساب کاربری <span className='fw-bold'>ندارید</span> کلیک کنید</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
