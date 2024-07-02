import React, { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { ConfirmationModal } from '../../common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProfile } from '../../../services/operations/settingsApi';

export const DeleteAccount = () => {
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal,setConfirmationModal] = useState(null);
  return (
    <>
        <div className='my-8 bg-pink-900 border-[1px] border-pink-700 p-8 px-12 rounded-md flex flex-row gap-x-5'>
            <div className='rounded-full h-14 w-14 aspect-square bg-pink-700 flex justify-center items-center'>
                <FiTrash2 className='text-3xl text-pink-200'/>
            </div>
            <div className='flex flex-col space-y-2'>
                <h1 className='text-lg text-richblue-5 font-semibold'>Delete Account</h1>
                <div className="w-3/5 text-pink-25">
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is
                        permanent and will remove all the contain associated with it.
                    </p>
                </div>
                <button 
                onClick={() => setConfirmationModal({
                    btn1text:"Delete",
                    btn2text:"Cancel",
                    text1:"Are you sure",
                    text2:"You account will be permanently deleted",
                    btn1handler:() => dispatch(deleteProfile(token,navigate)),
                    btn2handler:() => setConfirmationModal(null)
                })}
                className='w-fit cursor-pointer italic text-pink-300'>
                    I want to delete my account
                </button>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData = {confirmationModal}/>}
    </>
  )
}
