import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { FaStar } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import removeFromCart from '../../../slices/cartSlice'

export const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  return (
    <div className='flex flex-col flex-1'>
        {
            cart.map((course,index) => (
                <div className={`flex justify-between w-full flex-wrap items-
                ${index !== cart.length-1 && "border-b border-b-richblack-400 pb-6"}
                ${index !== 0 && "mt-6"}`}>
                    <div className='flex gap-4 flex-1 flex-col lg:flex-row'>
                        <img
                            src={course?.thumbnail}
                            alt={course?.name}
                            className='h-[148px] w-[220px] rounded-lg object-cover'
                        />
                        <div className='flex flex-col gap-1'>
                            <p className='text-richblack-5 text-lg font-medium'>{course?.name}</p>
                            <p className='text-sm text-richblack-300'>{course?.category?.name}</p>

                            <div className='flex gap-2 items-center'>
                                <p className='text-yellow-5'>4.5</p>
                                <ReactStars
                                    count={5}
                                    filledIcon={<FaStar/>}
                                    emptyIcon={<FaStar/>}
                                    value={course?.ratingAndReviews?.length}
                                    size={20}
                                    activeColor="#ffd700"
                                    edit={false}
                                />

                                <p className='text-richblack-400'>
                                    {course?.ratingAndReviews?.length} ratings
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col space-y-2 items-end'>
                        <button 
                        onClick={() => (dispatch(removeFromCart(course._id)))}
                        className='rounded-md bg-richblack-700 flex items-center border border-richblack-600 py-3 px-[12px] text-pink-200 gap-x-1'>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>
                        
                        <p className='mb-6 text-3xl font-medium text-yellow-100'> ₹ {course?.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
