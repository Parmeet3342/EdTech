import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../services/operations/settingsApi';

export const ChangePassword = () => {
  const {token} = useSelector((state) => state.auth);
  const [currentPassword,setcurrentPassword] = useState(false);
  const [changePassword, setchangePassword] = useState(false);
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const submitPasswordForm = (data) => {
    dispatch(updatePassword(token,data));
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className='mt-8 flex flex-col gap-4 rounded-md bg-richblack-800 p-4 px-12 border-[1px] border-richblack-700'>
          <h1 className='text-richblack-5 text-lg font-semibold tracking-wide'>
            Password
          </h1>
          <div className='flex flex-col lg:flex-row gap-5'>
            <div className='lg:w-[48%]'>
              <label className='relative'>
                <p className='lable-style mb-2'>Current Password</p>
                <input
                  type={currentPassword ? "text" : "password"}
                  name='currentPassword'
                  placeholder='Enter your current password'
                  {...register("oldPassword",{required:true})}
                  className='form-style w-full'
                />
                <span 
                onClick={() => setcurrentPassword(!currentPassword)}
                className='absolute right-3 top-[42px] cursor-pointer'>
                  {
                    currentPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                    ) : 
                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                  }
                </span>
              </label>
              {
                errors.oldPassword && (
                  <span>
                    Please enter current password
                  </span>
                )
              }
            </div>
            <div className='lg:w-[48%]'>
              <label className='relative'>
                <p className='lable-style mb-2'>Change Password</p>
                <input
                  type={changePassword ? "text" : "password"}
                  name='changePassword'
                  placeholder='Enter your current password'
                  {...register("newPassword",{required:true})}
                  className='form-style w-full'
                />
                <span 
                onClick={() => setchangePassword(!changePassword)}
                className='absolute right-3 top-[42px] cursor-pointer'>
                  {
                    changePassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                    ) : 
                    (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                  }
                </span>
              </label>
              {
                errors.newPassword && (
                  <span>
                    Please enter new password
                  </span>
                )
              }
            </div>
          </div>

          <div className='flex justify-end gap-2'>
            <NavLink to='/dashboard/my-profile'>
              <button className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'>
                Cancel
              </button>
            </NavLink>
            <IconBtn
              text="Save"
              type="submit"
            />
          </div>
        </div>
    </form>
    </>
  )
}
