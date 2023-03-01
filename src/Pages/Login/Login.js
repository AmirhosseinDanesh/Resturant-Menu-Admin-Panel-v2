import React from 'react'
import "./Login.css"
import Input from '../../Components/Forms/Input'
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validator/rules";
import { NavLink } from "react-router-dom"
export default function Login() {
    return (
        <>
            <div className="loginformbg col-12 d-flex justify-content-center">
                <div className="loginform col-md-4 ">
                    <h5 className='text-center'>
                        ورود
                    </h5>
                    <form>
                        <div className="form-group mb-3">
                            <label className='input-label' >آدرس ایمیل</label>
                            <Input type="email" className="form-control" placeholder='example@gmail.com' element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(20),
                                    
                                ]} />
                        </div>
                        <div className="form-group mb-3">
                            <label className='input-label' placeholder='خود را وارد کنید'>رمز عبور</label>
                            <Input type="password" className="form-control" placeholder='********' element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(18)
                                ]} />
                        </div>
                        <div className="form-check">
                            <Input type="checkbox" className="form-check-input" placeholder='********' element="input" />
                            <input type="checkbox" className="form-check-input" element="input" />
                            <label className="form-check-label" for="exampleCheck1">مرا به خاطر بسپار</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between ">
                            <button type="submit" className="submitbtn-login btn btn-success fw-bold">ورود</button>
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
