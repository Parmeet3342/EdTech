import React from 'react'
import { ContactUsForm } from '../ContactPage/ContactUsForm'

export const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-richblack-5 text-4xl font-semibold  text-center'>Get in Touch</h1>
      <p className='text-richblack-300 mt-3  text-center'>We’d love to here for you, Please fill out this form.</p>

      <div className='mx-auto max-w-[450px]'>
        <ContactUsForm/>
      </div>
    </div>
  )
}
