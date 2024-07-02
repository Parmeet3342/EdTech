import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/DashBoard/Sidebar';

export const Dashboard = () => {
    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);
if(authLoading || profileLoading){
    return (
        <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
            <div className='spinner'></div>
        </div>
    )
}

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='max-w-[1000px] mx-auto w-11/12 py-10'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
