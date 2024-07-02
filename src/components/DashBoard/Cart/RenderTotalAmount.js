import React from 'react'
import { useSelector } from 'react-redux'
import {IconBtn} from '../../common/IconBtn'

export const RenderTotalAmount = () => {
    const {total,cart} = useSelector((state) => state.auth)


    const handlebuyCourse = () =>{
        const courses = cart.map((course) => course._id);
        console.log(courses);
    }

  return (
    <div className='p-6 bg-richblack-800 border-[1px] rounded-md min-w-[280px] border-richblack-700'>
        <p className='mb-1 text-sm font-medium text-richblack-300'>Total:</p>
        <p className='mb-6 text-3xl font-medium text-yellow-100'>₹ {total}</p>
        <IconBtn
            text="Buy Now"
            onclick={handlebuyCourse}
            customClasses="w-full justify-center"
        />
    </div>
  )
}
