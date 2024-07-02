import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { RxCountdownTimer } from 'react-icons/rx';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP,signUp } from '../services/operations/authApi';
import toast from 'react-hot-toast';

export const VerifyEmail = () => {


    const navigate = useNavigate();
    const [otp ,setOtp] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {signupData} = useSelector((state) => state.auth);

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType
    } = signupData;

    useEffect(() => {
      if(!signupData){
        toast.error("Fill the SignUp Form");
        navigate("/signUp")
      }
    })

    const handleVerifyEmail = (e) => {
      e.preventDefault();

      dispatch(signUp(firstName,lastName,email,password,confirmPassword,otp,accountType,navigate));
    }
  return (
    <div className='w-11/12 flex justify-center items-center mx-auto'>
      {
        loading ?(
          <div>
            <div className='spinner'></div>
          </div>
        ) :
        (
        <div className='max-w-[500px] flex flex-col gap-3 justify-center lg:p-8 p-4'>
          <h1 className='font-semibold text-richblack-5 text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
          <p className='text-[1.125rem] leading-[1.625rem] text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
          <form
          onSubmit={handleVerifyEmail}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
              <input 
                {...props} 
                placeholder='-'
                style={{
                  boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                }}
                className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50'
              />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button
              type='submit'
              className='w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900'>
                Verify Email
            </button>
        </form>

        <div className='flex justify-between mt-2 items-center'>
          <Link to="/signUp">
            <p className='flex gap-x-2 text-richblack-5 items-center'>
              <BiArrowBack/> Back to SignUp
            </p>
          </Link>
          
          <button 
          className='flex gap-x-2 items-center text-blue-100'
          onClick={() => (dispatch(sendOTP(email,navigate)))}>
            <RxCountdownTimer/> Resent Otp
          </button>
        </div>
        </div>
        )
      }
    </div>
  )
}
