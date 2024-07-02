import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { CourseInformationForm } from './CourseInformationForm';
import { CourseBuilderForm } from './CourseBuilder/CourseBuilderForm'

export const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]

  return (
    <div className='w-[80%]'>
        <div className='flex lg:w-[80%] mx-auto mt-8 mb-2'>
            {
                steps.map((item) => (
                    <>
                        <div className={`${step === item.id ? "bg-yellow-900 text-yellow-100 border-yellow-50":
                        "bg-richblack-800 text-richblack-300 border-richblack-700"} border w-10 h-10 rounded-full flex justify-center items-center
                        ${step > item.id && "bg-yellow-50 text-yellow-50"}`}>
                            {
                                step > item.id ? (<FaCheck className='text-richblack-900'/>) : (item.id)
                            }
                        </div>
                        {
                            item.id !== steps.length && (
                                <div className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                                    step > item.id ? "border-yellow-50" : "border-richblack-500"
                                } mt-1`}></div>
                            )
                        }
                    </>
                ))
            }
        </div>
        
        <div className='flex lg:w-[80%] mx-auto mb-12'>
            {
                steps.map((item) => (
                    <>
                        <div className='w-[33%]'>
                            <p className={`text-sm  ${step >= item.id ? "text-richblack-5":"text-richblack-100"}
                            ${item.id === 2 && "ml-4"} ${item.id === 3 && "ml-20"}`}>
                                {item.title}
                            </p>
                        </div>
                    </>
                ))
            }
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
    </div>
  )
}
