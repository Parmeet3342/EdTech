// import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { ProfileDropDown } from '../core/Auth/ProfileDropDown'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
// import {apiConnector} from '../../services/apiconnector'
// import {categories} from '../../services/apis'

const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
];

export const NavBar = () => {

    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const location = useLocation();

    // const [subLinks,setSubLinks] = useState([]);

    // const fetchSublinks = async() => {
    //     try{

    //         const result = await apiConnector("GET",categories.CATEGORIES_API)
    //         console.log("result of categories is:-",result);
    //         setSubLinks(result.data.data);
    //     }
    //     catch(error){
    //         console.log("Can't fetch categories");
    //         console.error(error);
    //     }
    // }

    // useEffect( () => {
    //     fetchSublinks();
    // },[]);


    const matchRoute = (route) =>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <div className='h-14 border-b-[1px] border-b-richblack-700 flex items-center'>
        <div className='w-11/12 mx-auto flex justify-between items-center'>
            <Link to="/">
                <img src={Logo} width={160} height={42} loading='lazy' alt='logo'/>
            </Link>

            <div className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((ele,index) => (
                        <div key={index}>
                            {
                                ele.title === "Catalog" ?(
                                    <div className='relative flex items-center gap-2 group cursor-pointer'>
                                        <p>{ele.title}</p>
                                        <IoIosArrowDropdownCircle/>

                                        <div className='invisible w-[300px] absolute opacity-0 bg-richblack-5 rounded-md text-richblack-900 p-4 z-40 cursor-pointer
                                        transition-all duration-200 left-[50%] top-[50%] translate-x-[-50%] translate-y-[25%] group-hover:visible group-hover:opacity-100'>

                                            <div className='absolute rotate-45 h-6 w-6 bg-richblack-5 top-0 -z-10
                                            left-[50%] translate-x-[80%] translate-y-[-45%]'>
                                             </div>

                                            {
                                            subLinks.length?(
                                                subLinks.map((subLink,index) => (
                                                    <Link to={subLink.link}>
                                                        <p className='hover:bg-richblack-600 w-[100%] text-center capitalize rounded-md
                                                        transition-all duration-200 py-2 hover:text-richblack-5 tracking-wide font-semibold text-[16px]'>{subLink.title}</p>
                                                    </Link>
                                                ))
                                            ):(<div></div>)
                                        }
                                        </div>

                                       
                                        
                                    </div>
                                    ):
                                    (
                                    <Link to={ele.path}>
                                        <p className={`${matchRoute(ele.path) ?"text-yellow-25":"text-richblack-25"}`}>
                                            {ele.title}
                                        </p>
                                    </Link>
                                )
                            }
                        </div>
                    ))
                }
            </div>

            <div className='flex gap-x-4 items-center'>
                {
                    user && user.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart">
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border rounded-md text-richblack-100 border-richblack-700 bg-richblack-800 px-[12px] py-[8px]'>
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signUp">
                            <button className='border rounded-md text-richblack-100 border-richblack-700 bg-richblack-800 px-[12px] py-[8px]'>
                                SignUp
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>

        </div>
    </div>
  )
}
