import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const Requirements = ({
    name,
    register,
    setValue,
    errors,
    getValues
}) => {
    const [requirement,setRequirement] = useState("");
    const [requirementsList,setRequirementsList] = useState([]);
    const {editCourse,course} = useSelector((state) => state.course);

    useEffect(() => {
        if(editCourse){
            setRequirementsList(course?.instructions);
        }
        {register(name,{required:true,  validate: (value) => value.length > 0 })}
    },[])

    useEffect(() => {
        setValue(name,requirementsList)
    },[requirementsList])

    const handleAddRequirement = () => {
        if(requirement){
            
            setRequirementsList([...requirementsList,requirement])
            setRequirement("");
        }
    }

    const handleDeleteRequirement = (reqIndex) => {
        const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(reqIndex, 1)
        setRequirementsList(updatedRequirements)
    }

  return (
    <div>
        <label className='lable-style mb-1' htmlFor='courseRequirements'>
            Requirements/Instructions<sup>*</sup>
        </label>
        <input
            type='text'
            name={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='form-style w-full'
        />
        <button 
        type='button'
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50 mt-2'>
            Add
        </button>
        {
            requirementsList.length > 0 && (
                <ul className='text-richblack-5 spce-x-2'>
                    {
                        requirementsList.map((list,index) => (
                            <li key={index} className='flex space-x-2'>
                                <span>{list}</span>
                                <button
                                type='button'
                                onClick={() => handleDeleteRequirement(index)}
                                className='text-sm text-richblack-500 underline'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span>
                    Requirements/Instructions is required
                </span>
            )
        }
    </div>
  )
}
