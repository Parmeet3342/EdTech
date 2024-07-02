import React, { useEffect, useState } from 'react'
import { IconBtn } from '../common/IconBtn'
import { VscAdd } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../services/operations/courseDetailApi'
import { CourseTable } from './InstructorCourses/CourseTable'

export const MyCourses = () => {
    const [courses,setCourses] = useState([]);
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);

    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
    }


    useEffect(() => {
        fetchCourses();
    },[]);
  return (
    <div>
        <div className='mb-14 flex items-center lg:justify-between flex-col xl:flex-row'>
            <h1 className='text-richblack-5 text-3xl font-medium'>
                My Courses
            </h1>
            <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}>
                <VscAdd/>
            </IconBtn>
        </div>
        {courses && <CourseTable courses = {courses}  setCourses ={setCourses}/>}
    </div>
  )
}
