import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../../../services/operations/authApi'

export const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData,setFormData] = useState({email:"",password:""})

    const [showPassword,setShowPassword] = useState(false);

    const changeHandler = ((e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]:e.target.value
        }))
    })

    const {email,password} = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();

        dispatch(login(email,password,navigate))
    }

  return (
    <form 
    onSubmit={handleOnSubmit}
    className='mt-6 flex flex-col w-full gap-y-4'>

        <label className='w-full'>
            <p className='mb-1 text-richblack-5 text-[0.875rem] leading-[1.375rem]'>Email Address<sup>*</sup></p>
            <input
                type='email'
                required
                name='email'
                onChange={changeHandler}
                value={email}
                placeholder='Enter email address'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px] text-richblack-5 outline-none'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]'>Password<sup>*</sup></p>
            <input
                type={showPassword?"text":"password"}
                required
                placeholder='Enter Password'
                value={password}
                onChange={changeHandler}
                name='password'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='w-full rounded-[0.5rem] bg-richblack-800 px-[12px] py-[8px]  text-richblack-5 outline-none'
            />
            <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-[34px] cursor-pointer'
            >
                {showPassword?
                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):
                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>
            <Link to="/forgot-password">
                <p className='mt-1 ml-auto max-w-max text-sm text-blue-100'>Forgot Password</p>
            </Link>
        </label>

        <button 
        type='submit'
        className='text-center w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] font-medium text-richblack-900'>
            Sign in
        </button>
    </form>
  )
}
