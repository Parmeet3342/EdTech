import React from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa6'
import {FooterLink2} from '../../data/footer-links'


export const Footer = () => {

    const Resources = [
        "Articles",
        "Blog",
        "Chart Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces",
    ];

    const Plans =[
        "Paid memberships",
        "For students",
        "Business solutions"
    ]

    const Community = [
        "Forums",
        "Chapters",
        "Events"
    ];
    
    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
  return (
    <div className='bg-richblack-800'>
        <div className='w-11/12 mx-auto  gap-8 text-richblack-400 pt-14'>
            <div className='w-[100%] flex  border-b border-richblack-700 pb-5'>
                <div className='w-[50%] flex gap-3 flex-wrap border-r border-richblack-700'>
                    <div className='lg:w-[30%] flex flex-col gap-3 mr-8'>
                        <img src={Logo} className='object-contain' alt='logo'/>
                        <h1 className='text-[16px] text-richblack-50 font-semibold'>
                            Company
                        </h1>

                        <div className='flex flex-col gap-2'>
                        {["About","Careers","Affiliates"].map((element,index) => {
                            return (
                                <div
                                    key={index}
                                    className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'
                                >
                                    <Link to={element.toLowerCase()}>{element}</Link>
                                </div>
                            )})
                        }
                        </div>
                        <div className='flex gap-2'>
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />
                        </div>
                        
                    </div>

                    <div className='w-[30%] mb-7'>
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>

                        <div className='flex flex-col gap-2 mt-2 leading-4'>
                            {
                                Resources.map((ele,index) => {
                                    return (
                                        <div key={index}
                                        className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                            <Link to={ele.split(" ").join("-")}>{ele}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>Support</h1>

                        <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2'>
                            <Link to={"/help-center"}>Help Center</Link>
                        </div>
                    </div>

                    <div className='w-[30%] mb-7'>
                        <h1 className='text-richblack-50 text-[16px] font-semibold'>Plans</h1>

                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                Plans.map((ele,index) => {
                                    return (
                                        <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                            <Link to={ele.split(" ").join("-")}>{ele}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <h1 className='text-richblack-50 text-[16px] font-semibold mt-7'>Community</h1>

                        <div className='flex flex-col gap-2 mt-2'>
                            {
                                Community.map((ele,index) => {
                                    return (
                                        <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                            <Link to={ele.split(" ").join("-")}>{ele}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='w-[50%] flex  gap-3 flex-wrap justify-between pl-5'>
                    {
                        FooterLink2.map((ele,index) => {
                            return (
                                <div className='w-[30%] mb-7'>
                                    <h1 className='text-[16px] text-richblack-50 font-semibold'>{ele.title}</h1>

                                    <div className='flex flex-col gap-2 mt-2'>
                                        {
                                            ele.links.map((link,index) => {
                                                return (
                                                    <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                                        <Link to={link.link}>{link.title}</Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex w-[100%] justify-between items-center pt-6 pb-3'>
                <div className='flex flex-row'>
                    {
                        BottomFooter.map((ele,i) => (
                            <div className={`${
                                    BottomFooter.length-1 === i ?"":"border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"}
                                    px-3`}>
                                <Link to={ele.split(" ").join().toLowerCase()}>{ele}</Link>
                            </div>
                        ))
                    }
                </div>

                <div className='text-center'>Made with ♥ CodeHelp © 2023 Studynotion</div>
            </div>
        </div>
    </div>
  )
}
