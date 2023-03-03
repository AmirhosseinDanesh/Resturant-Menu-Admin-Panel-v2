import React,{useContext} from 'react'
import Input from '../../Components/Forms/Input'
import Button from "../../Components/Forms/button"
import { NavLink } from "react-router-dom"

import authContext from '../../Contexts/authContext'
import Data from "../../Data/Data"
import { requiredValidator, minValidator, maxValidator, emailValidator } from "../../Validator/rules";
import { useForm } from '../../Hooks/useForm';

import "./Register.css"
export default function Register() {
    const auth = useContext(authContext)
    console.log(auth)
    const [formState, onInputHandler] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            username: {
                value: "",
                isValid: false,
            },
            email: {
                value: "",
                isValid: false,
            },
            // phone: {
            //     value: "",
            //     isValid: false,
            // },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const registerNewUser = (event) => {
        event.preventDefault();
        
        const newUserData = {
            name: formState.inputs.name.value,
            username: formState.inputs.username.value ,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            confirmPassword : formState.inputs.password.value,
            // phone : formState.inputs.phone.value,
        }

        fetch(`${Data.url}/v1/auth/register` , {
            method: "POST" , 
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(newUserData)
        }).then((res) => res.json())
            .then(data=>{
                auth.login(data.user,data.accessToken)
                console.log(auth)

            })
            
            console.log("User Register");
    };

    return (
        <>
            <div className="loginformbg col-12 d-flex justify-content-center">
                <div className="loginform col-md-4 ">
                    <h5 className='text-center mb-5 fw-bold'>
                        ثبت نام
                    </h5>
                    <form>
                        <div className="form-group mb-3">
                            <label className='input-label' >نام و نام خانوادگی</label>
                            <Input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder='amir hossein danesh'
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
                                    maxValidator(28),
                                    emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        {/* <div className="form-group mb-3">
                            <label className='input-label' >شماره تلفن</label>
                            <Input
                                id="phone"
                                type="text"
                                className="form-control"
                                placeholder='09123456789'
                                element="input"
                                validations={[
                                    requiredValidator(),
                                    minValidator(8),
                                    maxValidator(28),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div> */}
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
                                onClick={registerNewUser}
                                disabled={!formState.isFormValid}
                            >
                                ثبت نام
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
