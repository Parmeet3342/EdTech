import React, { useState } from 'react'
import {sidebarLinks} from '../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { SidebarLink } from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import { logout } from '../../services/operations/authApi'
import { useNavigate } from 'react-router-dom'
import {ConfirmationModal} from '../common/ConfirmationModal';

export const Sidebar = () => {
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);
  return (
    <>
        <div className='min-w-[222px] h-[calc(100vh-3.5rem)] flex flex-col py-10 border-r-[1px] border-r-richblack-700 bg-richblack-800'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null
                        return (
                            <SidebarLink key={link.id} link = {link} iconName = {link.icon}/>
                        )
                    })
                }
            </div>

            <div className='w-10/12 mx-auto h-[1px] my-6 bg-richblack-700'></div>

            <div className='flex flex-col'>
                <SidebarLink link={{name:"Settings",path:"/dashboard/settings"}} iconName="VscSettingsGear"/>
                <button
                    className='flex items-center gap-2 p-2 bg-opacity-0 text-richblack-300'
                    onClick={() => setConfirmationModal({
                    btn1text:"Logout",
                    btn2text:"Cancel",
                    text1:"Are you sure",
                    text2:"You will be logged out of your account.",
                    btn1handler:() => dispatch(logout(navigate)),
                    btn2handler:() => setConfirmationModal(null)
                    })}
                >
                    <VscSignOut className='text-lg'/>
                   <span>Logout</span>
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData = {confirmationModal}/>}
    </>
  )
}
