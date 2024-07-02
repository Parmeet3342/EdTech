import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setEditCourse,setCourse,setStep } from '../../../../slices/courseSlice'
import { IconBtn } from '../../../common/IconBtn'
import {IoAddCircleOutline} from 'react-icons/io5'
import { NestedView } from './NestedView'
import toast from 'react-hot-toast'
import {MdNavigateNext} from 'react-icons/md'
import { updateSection, createSection } from '../../../../services/operations/courseDetailApi'


export const CourseBuilderForm = () => {

  const {course} = useSelector((state) => state.course)
  const [editSectionName,setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState:{errors}
  } = useForm()

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName","")
  }

  const goToNext = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section")
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture to each section")
      return;
    }
    dispatch(setStep(3));
  }

  const onSubmit = async (data) => {

    setLoading(true);
    let result;
    if(editSectionName){
      result = await updateSection(
        {
          name:data.sectionName,
          courseId:course._id,
          sectionId:editSectionName
        },
        token
      )
    }
    else{
      result = await createSection(
        {
          name:data.sectionName,
          courseId:course._id
        },
        token
      )
    }
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName","")
    }
    setLoading(false);
  }

  return (
    <div className='lg:w-[80%] ml-10 bg-richblack-800 p-6 rounded-md'>
      <h1 className='text-richblack-5 text-2xl font-medium mb-3'>Course Builder</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <p className='lable-style mb-1'>Section Name<sup>*</sup></p>
            <input
            type='text'
            name='sectionName'
            placeholder='Please enter section name'
            {...register("sectionName",{required:true})}
            className='form-style w-full'
            />
          </label>
          {
            errors.sectionName && (
              <span>
                Please enter section name
              </span>
            )
          }
        </div>
        <div className='flex items-end gap-x-4 mt-2'>
          <IconBtn
            type='submit'
            disabled = {loading}
            text = {editSectionName ? "Edit Section Name":"Create Section"}
            outline = {true}
          >
            <IoAddCircleOutline className="text-yellow-50" fontSize = {20}/>
          </IconBtn>
          {
            editSectionName && (
              <button 
              type='button'
              onClick={cancelEdit}
              className='text-richblack-300 underline cursor-pointer text-sm'> 
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView/>
        )
      }

      <div className='flex justify-end gap-x-2 mt-4'>
        <button 
        className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
          Go Back
        </button>

        <IconBtn
        type="button"
        text = "Next"
        disabled={loading}
        onclick={goToNext}> 
          <MdNavigateNext/>
        </IconBtn>
      </div>
    </div>
  )
}
