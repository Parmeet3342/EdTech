import React from 'react'
import { IconBtn } from './IconBtn'

export const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm grid place-items-center'>
        <div className='w-11/12 max-w-[370px] rounded-md bg-richblack-800 border border-richblack-400 p-6 space-y-2'>
            <p className='text-richblack-5 text-2xl font-semibold'>{modalData.text1}</p>
            <p className='text-richblack-300 text-lg font-medium'>{modalData.text2}</p>

            <div className='flex gap-x-4 pt-4'>
            <IconBtn
                onclick = {modalData?.btn1handler}
                text = {modalData?.btn1text}
            />
            <button
            className='cursor-pointer rounded-md py-[8px] px-[20px] bg-richblack-200 font-semibold text-richblack-900'
            onClick={modalData?.btn2handler}>
                {modalData?.btn2text}
            </button>
        </div>
        </div>

       
    </div>
  )
}
