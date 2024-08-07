import React from 'react'
import { HighLightText } from '../core/HomePage/HighLightText';
import CTAbutton from '../core/HomePage/Button'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highliteText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];
export const LearningGrid = () => {
  return (
    <div className='mx-auto xl:w-fit w-[350px] grid grid-cols-1 xl:grid-cols-4 mb-24 '>
        {
            LearningGridArray.map((card,i) => {
                return(
                    <div className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}
                    ${card.order % 2 === 1 ? "bg-richblack-700 h-[294px]":
                    card.order % 2 === 0 ? "bg-richblack-800 xl:h-[294px]":"bg-transparent"}
                    ${card.order === 3 && "xl:col-start-2"}
                    `} key={i}>
                        {
                            card.order < 0 ?(
                                <div className='flex flex-col xl:w-[90%] gap-3 pb-10 xl:pb-0'>
                                    <div className='text-4xl font-semibold'>
                                        {card.heading}
                                        <HighLightText text = {card.highliteText}/>
                                    </div>
                                    <p>
                                        Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable,
                                        job-relevant online learning to individuals and organizations worldwide.
                                    </p>
                                    <div className='mt-6'>
                                        <CTAbutton active={true} arrow={false} text={card.BtnText} linkto={card.BtnLink}/>
                                    </div>
                                </div>
                            ):(
                                <div className='p-8 flex flex-col gap-8'>
                                    <h1 className='text-lg'>{card.heading}</h1>
                                    <p className='text-richblack-300 font-medium'>{card.description}</p>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
    </div>
  )
}
