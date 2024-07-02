import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

export const SidebarLink = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname)
    }
  return (
    <NavLink 
       to={link.path}
       className={`${matchRoute(link.path) ? "bg-yellow-800 text-yellow-25 border-l-2 border-l-yellow-50"
       :"bg-opacity-0 text-richblack-300"}`}
    >
        <div className='flex items-center gap-2 p-2'>
            <Icon className ="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}
