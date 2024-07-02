import React from 'react'
import { HighLightText } from '../core/HomePage/HighLightText'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

export const Qoute = () => {
  return (
    <div className='w-full md:text-3xl text-xl font-semibold mx-auto py-5 pb-20 text-center  text-white '>
        <FaQuoteLeft fontSize={16} fill='#424854'
            className=' ml-10'
        />
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighLightText text={"combiones technology"}/>,{" "}
        <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text '>expertise</span>,{" "}
        and community to create an
        <div className='flex w-full mx-auto text-center'>
        <div className='w-[30%]'></div>
        <span className='text-center bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text '>{" "}unparalleled educational experience.</span>
        <FaQuoteRight fontSize={18} fill='#424854'/>
        </div>
        
    </div>
  )
}
