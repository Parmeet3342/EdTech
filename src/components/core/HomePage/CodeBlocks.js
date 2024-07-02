import React from 'react'
import CTAbutton from './Button';
import { TypeAnimation } from 'react-type-animation';

export const CodeBlocks = ({heading,subheading,position,ctabtn1,ctabtn2,codeblock,codeColor}) => {
  return (
    <div className={`flex ${position}  my-20  gap-10 justify-between`}>
        <div className='w-[50%] flex flex-col  gap-6  '>
            <div className='w-[90%]'>
                {heading}
            </div>
            <div className=' text-richblack-300 font-bold w-[85%]'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAbutton active = {ctabtn1.active} linkto = {ctabtn1.linkto} text = {ctabtn1.btntext} arrow = {ctabtn1.arrow}/>
                <CTAbutton active = {ctabtn2.active} linkto={ctabtn2.linkto} text={ctabtn2.btntext} arrow={ctabtn2.arrow}/>
            </div>

        </div>

        <div className='w-[50%]  bg-richblack-800 py-2 lg:w-[500px] h-fit min-h-[280px]'>
            <div className={`py-2 px-2 ${codeColor} font-mono leading-5 h-fit min-h-[230px] tracking-tight -mb-4`}>
                <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor = {true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation = {true}
                />
            </div>
        </div>
    </div>
  )
}
