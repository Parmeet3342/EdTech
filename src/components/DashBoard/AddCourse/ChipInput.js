import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"

export const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues
}) => {

    const [chips,setChips] = useState([]);
    const {editCourse,course} = useSelector((state) => state.course);

    useEffect(() => {
        if(editCourse){
            setChips(course?.tag)
        }

        register(name,{required:true, validate : (value) => value.length > 0})
    },[])

    useEffect(() => {
        setValue(name,chips)
    },[chips])

    const handleDeleteKey = (chipIndex) =>{

        const newChips = chips.filter((_,index) => index !== chipIndex)
        setChips(newChips)
    }

    const handleKeyDown = (event) => {

        if(event.key === "Enter" || event.key === ','){
            event.preventDefault();

            const chipValue = event.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                setChips([...chips,chipValue])
            }
            event.target.value = ""
        }
       
    }
  return (
    <div>
        <label className='lable-style mb-1' htmlFor={name}>
            {label}
        </label>
        <div className='w-full flex flex-wrap gap-2 mb-1'>
            {
                chips.map((chip,index) => (
                    <div 
                    key={index}
                    className='flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                        {chip}
                        <button
                        type='button'
                        className='ml-2 focus:outline-none'
                        onClick={() => handleDeleteKey(index)}>
                            <MdClose className = 'text-sm'/>
                        </button>
                    </div>
                ))
            }
        </div>

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
    </div>
  )
}
