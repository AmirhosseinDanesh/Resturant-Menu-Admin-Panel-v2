import React from 'react'
import Input from '../../Components/Forms/Input'
import { NavLink } from "react-router-dom"
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validator/rules";
import Button from "../../Components/Forms/button"
import { useForm } from '../../Hooks/useForm';
import "./Register.css"
export default function Register() {
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

    console.log(formState);

    const userLogin = (event) => {
        event.preventDefault();
        console.log("User Login");
    };

    return (
        <>
            <div className="loginformbg col-12 d-flex justify-content-center">
                <div className="loginform col-md-4 ">
                    <h5 className='text-center'>
                        ثبت نام
                    </h5>
                    <form>
                        <div className="form-group mb-3">
                            <label className='input-label' >نام کاربری</label>
                            <Input
                                id="username"
                                type="text"
                                className="form-control"
                                placeholder='amirdanesh'
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(18),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className='input-label' >آدرس ایمیل</label>
                            <Input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder='example@gmail.com'
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(18),
                                    emailValidator()
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
                        <div className="d-flex align-items-center justify-content-between ">
                            <Button
                                className={`submitbtn-login btn fw-bold ${formState.isFormValid
                                    ? "btn-success"
                                    : "btn-danger"
                                    }`}
                                type="submit"
                                onClick={userLogin}
                                disabled={!formState.isFormValid}
                            >
                                ورود
                            </Button>
                            <NavLink to="/login" className="text-white text-decoration-none">
                                <button type="submit" className="submitbtn-login btn btn-success">اگر حساب کاربری <span className='fw-bold'>دارید</span> کلیک کنید</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
