import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Button = ({active,text,linkto,arrow}) => {
  return (
    <NavLink to={linkto}>
      <div className={`flex items-center w-fit gap-2 font-semibold rounded-md text-[13px] px-6 py-3 border-r-[2px] border-b-[2px] ${active?"bg-yellow-50 text-black border-yellow-5":"bg-richblack-800 border-richblack-400 text-white"}`}>
        <p>{text}</p>
        {arrow? <FaArrowRight/>:""}
      </div>
    </NavLink>
  )
}

export default Button
