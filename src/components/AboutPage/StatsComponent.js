import React from 'react'

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

export const StatsComponent = () => {
  return (
    <div className='bg-richblack-700 mt-14'>
        {/* Stats */}
        <div className='w-11/12 mx-auto max-w-maxContent text-white justify-between grid grid-cols-2 md:grid-cols-4'>
            {
                Stats.map((data,index) => (
                    <div className='text-center py-10' key={index}>
                        <h1 className='text-[30px] font-bold text-richblack-5'>{data.count}</h1>
                        <p className='font-semibold text-[16px] text-richblack-500'>{data.label}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
