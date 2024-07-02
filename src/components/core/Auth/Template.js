import React from 'react'
import { useSelector } from 'react-redux'
import { LoginForm } from './LoginForm';
import  SignUpForm  from './SignUpForm';
import frameImg from '../../../assets/Images/frame.png'

export const Template = ({title,description1,description2,image,formType}) => {
  const {loading} = useSelector((state) => state.auth);
  return (
    <div className=''>
        {
          loading ?(
            <div className='spinner text-white text-[28px] flex items-center justify-center'></div>
          ):(
            <div className='w-11/12 flex flex-col-reverse gap-y-12 md:gap-y-0  py-12 mx-auto md:flex-row justify-between'>
              <div className='max-w-[450px] mx-auto w-11/12 md:mx-0'>
                <h1 className='text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem]'>
                  {title}
                </h1>

                <p className='mt-4 leading-[1.625rem] text-[1.125rem]'>
                  <span className='text-richblack-100'>{description1}</span>{" "}
                  <span className='text-blue-100 font-edu-sa italic font-bold'>{description2}</span>
                </p>

                {formType === "SignUp"?(<SignUpForm/>):(<LoginForm/>)}
              </div>

              <div className='relative max-w-[450px] w-11/12 mx-auto md:mx-0'>
                <img src={frameImg}
                  alt='Frame_Image'
                  width={558}
                  height={504}
                  loading='lazy'
                />

                <img src= {image}
                  alt='Login_Image'
                  width={558}
                  height={504}
                  loading='lazy'
                  className='absolute -top-4 right-4'
                />
              </div>
            </div>
          )
        }
    </div>
  )
}
