import React, { useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApi';

export const ProfileDropDown = () => {
  const {user} = useSelector((state) => state.profile);
  const [open , setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


 
  return (
    <button className='relative' onClick={() => setOpen(!open)}>
      <div className='flex gap-x-1 items-center'>
        <img 
          src={user?.imageUrl}
          alt={`profile-${user?.firstName}`}
          className='aspect-square rounded-full w-[30px] object-cover'
        />
        <AiOutlineCaretDown className='text-richblack-100 text-sm'/>
      </div>

      {
        open && (
          <div 
          onClick={(e) => e.stopPropagation()}
          className='absolute top-[120%] z-[1000] p-2 flex flex-col gap-3 rounded-md right-0 border-[1px] border-richblack-700 bg-richblack-800'>
            <NavLink to="/dashboard/my-profile">
              <div 
              onClick={() => setOpen(false)}
              className='flex gap-1 items-center px-1 rounded-md text-richblack-100  hover:bg-richblack-700 hover:text-richblack-25'>
                <VscDashboard className='text-lg'/>
                Dashboard
              </div>
            </NavLink>

            <div className='w-11/12 bg-richblack-600 h-[1px] mx-auto'></div>

            <div

            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className='flex gap-3 items-center px-1 rounded-md text-richblack-100  hover:bg-richblack-700 hover:text-richblack-25'
            >
              <VscSignOut className='text-lg'/>
              Logout
            </div>
          </div>
        )
      }
    </button>
  )
}
