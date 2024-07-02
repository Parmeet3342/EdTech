import React from 'react'
import { BiPhone } from 'react-icons/bi'
import { BsGlobeEuropeAfrica } from 'react-icons/bs'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { ContactUsForm } from '../components/ContactPage/ContactUsForm'
import { ReviewSlider } from '../components/common/ReviewSlider'
import { Footer } from '../components/common/footer'

export const Contact = () => {
  return (
    <div>
        {/* Section-1 */}
        <section className='w-11/12 mx-auto max-w-maxContent flex lg:flex-row flex-col gap-10  my-16 '>
            {/* left */}
            <div className='h-fit rounded-md bg-richblack-700 p-6 flex flex-col gap-8 justify-between lg:w-[37%] mx-auto w-full'>
                <div className='flex gap-2'>
                    <HiChatBubbleLeftRight fill='#AFB2BF' className='mt-2'/>
                    <div className='flex flex-col'>
                        <p className='text-richblack-5 text-xl font-semibold'>Chat on us</p>
                        <p className='text-richblack-300'>Our friendly team is here to help.</p>
                        <p className='text-richblack-300'>@mail address</p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <BsGlobeEuropeAfrica fill='#AFB2BF' className='mt-2'/>
                    <div className='flex flex-col'>
                        <p className='text-richblack-5 text-xl font-semibold'>Visit us</p>
                        <p className='text-richblack-300'>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-300'>Here is the location/ address</p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <BiPhone fill='#AFB2BF' className='mt-2'/>
                    <div className='flex flex-col'>
                        <p className='text-richblack-5 text-xl font-semibold'>Call us</p>
                        <p className='text-richblack-300'>Mon - Fri From 8am to 5pm</p>
                        <p className='text-richblack-300'>+123 456 7890</p>
                    </div>
                </div>
            </div>

            {/* right */}
            <div className='h-fit rounded-md border border-richblack-500 p-8 flex flex-col gap-4 lg:w-[calc(100%-40%)] mx-auto w-full'>
                <h1 className='text-richblack-5 font-semibold text-4xl lg:w-[90%]'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                <p className='text-richblack-300'>Tell us more about yourself and what you’re got in mind.</p>
                <ContactUsForm/>
            </div>
        </section>

        {/* Section-2 */}
        <section className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-6 mt-36'>
            <h1 className='text-richblack-5 font-semibold text-4xl text-center'>Review from other learners</h1>
            <ReviewSlider/>
        </section>

        {/* Section-3 */}
        <Footer/>
    </div>
  )
}
