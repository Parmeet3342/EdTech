import React from 'react'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAbutton from './Button';

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20 gap-8'>

       
        <p className='text-3xl font-semibold text-center'>Your swiss knife for <span className='bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent'>learning any language</span></p>
        <p className='text-richblack-500 text-center w-[53%] tracking-tight mt-1'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        
        <div className='flex flex-row items-center justify-center'>

            <img 
                src={know_your_progress}
                className='object-contain -mr-32 h-[400px]'
                alt='language'
            />

            <img
                src={compare_with_others}
                className='object-contain h-[500px]'
                alt='language'
            />

            <img
                src={plan_your_lessons}
                className='object-contain -ml-36 h-[450px]'
                alt='language'
            />
        </div>
        
        <CTAbutton active={true} linkto={'/signUp'} arrow={false} text={"Learn More"}/>
    </div>
  )
}
