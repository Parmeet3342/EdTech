import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';
import { HighLightText } from '../components/core/HomePage/HighLightText';
import CTAbutton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import { TimeLineSection } from '../components/core/HomePage/TimeLineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import { Footer } from '../components/common/footer';


export const Home = () => {
  return (
    <div>
        {/* Section1 */}

        <div className='relative w-11/12 mx-auto  flex flex-col items-center text-white justify-between max-w-maxContent'>

            <NavLink to={"/signUp"}>
                <button className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex flex-row gap-2 items-center rounded-full px-[10px] py-[5px] font-bold
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </button>
            </NavLink>

            <div className='text-white font-bold text-4xl mt-7 text-center'>
                Empower Your Future with 
                <HighLightText text = {"Coding Skills"}/>
            </div>

            <div className='w-[75%] mx-auto text-center text-richblack-300 text-lg mt-4 font-semibold tracking-tighter'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get 
                access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAbutton active = {true} linkto = {"/signUp"} text = {"Learn More"} arrow = {false}/>
                <CTAbutton active = {false} linkto = {"/login"} text = {"Book a Demo"} arrow = {false}/>
            </div>

           <div className='relative w-[100%] my-12 z-0 shadow-blue-200'>
           <video className='my-12 z-20'
            loop
            muted
            autoPlay
            >
                <source src={Banner} type='video/mp4'/>
            </video>
          
            <div className='bg-white absolute top-16 left-3  h-[655px] w-[100%] -z-10'></div>
           </div>

           <div className='mt-12'>
            {/* Section1 */}
            <CodeBlocks
                heading = {
                    <div className='text-4xl font-semibold'>
                        Unlock your 
                        <HighLightText text = {"coding potential"}/>
                        with our online courses.
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                ctabtn1 = {
                    {
                        active:true,
                        btntext:"Try it yourself",
                        linkto:"/signUp",
                        arrow:true
                    }
                }

                ctabtn2 = {
                    {
                        active:false,
                        btntext:"Learn More",
                        linkto:"/signUp",
                        arrow:false
                    }
                }

                position = {"lg:flex-row"}

                codeblock = {`1 <!DOCTYPE html>\n 2 <html>\n 3 <head><>Example</\n 4 title><linkrel="stylesheet"href="styles.css">\n 5 </head>
                6 <body>\n 7 <h1><ahref="/">Header</a>\n 8 </h1>\n 9 <nav><ahref="one/">One</a><ahref="two/">Two</\n 10 a><ahref="three/">Three</a>
                11 </nav>`}

                codeColor={"text-yellow-25"}
            />


            <CodeBlocks
                heading = {
                    <div className='text-3xl font-semibold'>Start <span className=''>Coding <br/> in seconds </span></div>
                }

                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                ctabtn1 = {
                    {
                        active:true,
                        linkto:"/signUp",
                        btntext:"Continue Lesson",
                        arrow:true
                    }
                }

                ctabtn2 = {
                    {
                        active:false,
                        linkto:"/login",
                        btntext:"Learn More",
                        arrow:false
                    }
                }

                position={"lg:flex-row-reverse"}

                codeblock={`1 <!DOCTYPE html>\n 2 <html>\n 3 <head><>Example</\n 4 title><linkrel="stylesheet"href="styles.css">\n 5 </head>
                6 <body>\n 7 <h1><ahref="/">Header</a>\n 8 </h1>\n 9 <nav><ahref="one/">One</a><ahref="two/">Two</\n 10 a><ahref="three/">Three</a>
                11 </nav>`}

                codeColor={"text-yellow-25"}
            />
           </div>

           <div className='w-[100%] text-center mt-24 mb-10'>
            <p className='text-3xl font-semibold mb-1'>Unlock the <HighLightText text= {"Power of Code"}/></p>
            <p className='text-sm text-richblack-300'>Learn to Build Anything You Can Imagine</p>
           </div>
           
           <div className='flex w-[90%] gap-x-6 '>
            <div className='w-[30%] relative z-0'>
                <div className='w-[100%] h-[193px] bg-yellow-100 absolute -z-10 top-2 left-2'></div>
                <div className='w-[100%] px-3 py-4 bg-white h-fit text-richblack-500  z-20'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-richblack-900 font-semibold'>Learn HTML</p>
                        <p className='text-sm '>This course covers the basic concepts of HTML including creating and
                          structuring web pages, adding text, links, images, and more.
                        </p>
                    </div>

                    <hr className='w-[100%] border-dotted mt-8'></hr>
                    <div className='flex justify-between mt-3 text-[14px]'>
                        <p>Beginner</p>
                        <p>6 Lessons</p>
                    </div>
                </div>
            </div>

            <div className='w-[30%] px-3 py-4 bg-richblack-800 h-fit text-richblack-500'>
                <div className='flex flex-col gap-3'>
                    <p className='text-white font-semibold'>Learn CSS</p>
                    <p className='text-sm '>This course explores advanced topics in HTML5 and CSS3, including animations,
                     transitions, and layout techniques
                    </p>
                </div>

                <hr className='w-[100%] border-dotted mt-8'></hr>
                <div className='flex justify-between mt-3 text-[14px]'>
                    <p>Beginner</p>
                    <p>6 Lessons</p>
                </div>
            </div>

            <div className='w-[30%] px-3 py-4 bg-richblack-800 h-fit text-richblack-500'>
                <div className='flex flex-col gap-3'>
                    <p className='text-white font-semibold'>Learn CSS</p>
                    <p className='text-sm '>This course explores advanced topics in HTML5 and CSS3, including animations,
                     transitions, and layout techniques
                    </p>
                </div>

                <hr className='w-[100%] border-dotted mt-8'></hr>
                <div className='flex justify-between mt-3 text-[14px]'>
                    <p>Beginner</p>
                    <p>6 Lessons</p>
                </div>
            </div>
           </div>
        </div>


        {/* Section2 */}

        <div className=' bg-pure-greys-5 -mt-16'>

            <div className='homePage_img h-[280px] flex items-center justify-center'>

                <div className='flex gap-6 '>
                    <CTAbutton active ={true} linkto={'/signUp'} arrow={true} text={"Explore Full Catalog"}/>
                    <CTAbutton active ={false} linkto={'/signUp'} arrow={false} text={"Learn More"}/>
                </div>
            </div>

            <div className='w-11/12 mx-auto  mt-16 flex flex-col gap-7'>
                <div className='flex  gap-10 mb-20'>
                    <div className='text-3xl font-bold w-[50%]'>
                    <p className='w-[90%] text-richblack-900'>Get the skills you need for a <span className='text-transparent bg-gradient-to-r from-[#5433FF] via-[#20BDFF] to-[#A5FECB] bg-clip-text'>
                        job that is in demand.</span>
                    </p>
                    </div>

                    <div className='w-[50%]'>
                    <div className='flex flex-col justify-between gap-10'>
                        <p className='text-richblack-700 text-[16px]'>
                         The modern StudyNotion is the dictates its own terms.
                         Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <CTAbutton active={true} linkto={'/signUp'} arrow={false} text={"Learn More"}/>
                    </div>
                    </div>
                </div>

                <TimeLineSection/>
                <LearningLanguageSection/>
            </div>

            
        </div>

        {/* Section3 */}

        <div className='w-11/12 mx-auto flex flex-col items-center justify-between gap-8'>
            
            <InstructorSection/>

            <h2 className='text-3xl font-semibold text-pure-greys-5'>Reviews from other learners</h2>
        </div>

        {/* Section4 */}
        <Footer/>
    </div>
  ) 
}
