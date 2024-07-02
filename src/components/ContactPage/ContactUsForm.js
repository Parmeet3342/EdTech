import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { contactUs } from '../../services/operations/contactApi';

export const ContactUsForm = () => {

  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful}
  } = useForm()

  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        firstname:"",
        lastname:"",
        email:"",
        phonenumber:"",
        message:""
      })
    }
  },[reset,isSubmitSuccessful]);

  const submitContactForm = (data) => {
    dispatch(contactUs(data,setLoading));
  }
  return (
    <form className='w-full flex flex-col gap-7 mt-8' onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex lg:flex-row flex-col gap-5 w-full'>
         <div className='w-full'>
            <label>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name</p>
              <input
              type='text'
              name='firstname'
              placeholder='Enter first name'
              {...register("firstname",{required:true})}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
            {
              errors.firstname && (
                <span className='text-yellow-25'>
                    Please enter your name
                </span>
              )
            }
          </div>
          <div className='w-full'>
            <label>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Last Name</p>
              <input
              type='text'
              name='lastname'
              placeholder='Enter last name'
              {...register("lastname")}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
          </div>
      </div>

      <label>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email Address</p>
        <input
          type='email'
          name='email'
          placeholder='Enter email address'
          {...register("email",{required:true})}
          style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      {
        errors.email && (
          <span className='text-yellow-25'>
            Please enter your email address
          </span>
        )
      }

      <label>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Messages</p>
        <textarea 
          name='message'
          rows="4"
          cols="30"
          placeholder='Enter message here'
          {...register("message",{required:true})}
          style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      {
        errors.message && (
          <span className='text-yellow-25'>
            Please enter the message
          </span>
        )
      }

      <button 
      disabled={loading}
      type='submit'
      className={`w-full rounded-md py-2 bg-yellow-50 text-richblack-900 font-bold
      ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] 
      `}
      >
        Send Message
      </button>
    </form>
  )
}
