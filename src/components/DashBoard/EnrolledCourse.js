import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../services/operations/profileApi';
import ProgressBar from '@ramonak/react-progress-bar';

export const EnrolledCourse = () => {
  const [enrolledCourse,setEnrolledCourse] = useState(null);
  const {token} = useSelector((state) => state.auth);

 function getEnrolledCourses(){
    try{

      const res = getUserEnrolledCourses(token);

      setEnrolledCourse(res);
    }
    catch(error){
      console.log("Unable to fetch enrolled courses")
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  },[])
  return (
    <div>
      <h1 className='text-richblack-5 text-3xl font-medium mb-14'>Enrolled Courses</h1>

      {
        !enrolledCourse ? (
          <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
             <p className='text-richbalck-5'>Loading</p>
            <div className='spinner'></div>
          </div>
        ):!enrolledCourse.length ? (
          <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
            Your cart is empty
          </p>
        ):(
          <div className='my-8'>
            <div className='rounded-t-lg bg-richblack-lg flex'>
              <p className='w-[45%] px-5 py-3'>Course Name</p>
              <p className='w-1/4 px-2 py-3'>Durations</p>
              <p className='px-2 py-3'>Progress</p>
            </div>

            {
              enrolledCourse.map((course,index,arr) => (
                <div className={`flex items-center border border-richblack-700
                ${index === arr.length-1 ? "rounded-b-lg ":"rounded-none"}`}
                key={index}>
                  <div 
                  // onClick={() => } to add 
                  className='flex w-[45%] items-center cursor-pointer px-5 py-3 gap-4'>
                    <img
                      src={course?.thumbnail}
                      alt='course'
                      className='h-14 w-14 rounded-lg object-cover'
                    />
                    <div className='flex flex-col gap-2 max-w-xs'>
                      <p className='text-richblack-5 font-semibold'>{course?.name}</p>
                      <p className='text-xs text-richblack-300'>
                        {
                          course?.description > 50 ? `${course.description.slice(0,50)}...`:course.description
                        }
                      </p>
                    </div>
                  </div>

                  <div className='w-1/4 flex items-center py-3 px-2'>
                    <p className='text-richblac-5'>{course?.totalDuration}</p>
                  </div>

                  <div className='w-1/5 flex flex-col gap-2 px-2 py-3'>
                    <p className='text-richblac-5'>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      height='8px'
                      isLabelVisible ={false}
                      completed={course.progressPercentage || 0}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
