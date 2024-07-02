import React from 'react'
import { useSelector } from 'react-redux'
import  ChangeProfilePicture from './Setting/ChangeProfilePicture';
import { EditProfile } from './Setting/EditProfile';


export const Settings = () => {
    const {user} = useSelector((state) => state.profile);
  return (
    <div className='w-10/12 mx-auto'>
        <h1 className='text-3xl text-richblack-5 font-medium mb-10'>
            Settings
        </h1>

        <ChangeProfilePicture user ={user}/>

        <EditProfile user = {user}/>

        
    </div>
  )
}
