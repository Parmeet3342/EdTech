import React from 'react'
import { useSelector } from 'react-redux'
import { IconBtn } from '../common/IconBtn';
import { useNavigate } from 'react-router-dom';

export const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
  return (
    <>
        <h1 className='text-richblack-5 text-3xl font-medium mb-14'>
            My Profile
        </h1>
        <div className='flex items-center justify-between lg:flex-row flex-col gap-2 rounded-md p-8 px-12 border-[1px] border-richblack-700 bg-richblack-800'>
            <div className='flex items-center gap-x-2'>
                <img
                    src={user?.imageUrl}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div className='space-y-1'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className='text-richblack-300 text-sm'>
                        {user?.email}
                    </p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onclick = {() => navigate('/dashboard/settings')}
            />
        </div>

        <div className='bg-richblack-800 border-[1px] border-richblack-700 rounded-md p-8 px-12px flex flex-col gap-y-10 my-10'>
            <div className='flex items-center justify-between mr-5'>
                <p className='text-lg text-richblack-5'>About</p>
                <IconBtn 
                    text="Edit"
                    onclick = {() => {navigate("/dashboard/settings")}}
                />
            </div>
            <p 
            className={`${
                user?.additionalDetails?.about ? "text-richblack-5":"text-richblack-400"
            } text-sm font-medium`}
            >
                {
                    user?.additionalDetails?.about ?? "Write Something About Yourself"
                }
            </p>
        </div>

        <div className='my-10 flex flex-col bg-richblack-800 border-[1px] border-richblack-700 p-8 px-12 rounded-md gap-y-10'>
            <div className='flex items-center justify-between lg:flex-row flex-col gap-2'>
                <p className='text-richblack-5 text-lg'>Personal Details</p>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                       navigate("/dashboard/settings") 
                    }}
                />
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 items-center  gap-6'>
                
                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-richblack-600'>First Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                </div>
              

                
                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-richblack-600'>Last Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.lastName ?? "Add your lastname"}</p>
                </div>
                

                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-richblack-600'>Email</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                </div>
                

                <div className='flex flex-col gap-1'>
                    <p className='text-sm text-richblack-600'>Phone Number</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add your number"}</p>
                </div>
                
            </div>
        </div>
    </>
  )
}
