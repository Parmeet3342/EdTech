import React from 'react'
import { useForm } from 'react-hook-form'
import { countrycode } from '../../../data/countrycode';
import { NavLink } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../services/operations/settingsApi';
import { DeleteAccount } from './DeleteAccount';
import { ChangePassword } from './ChangePassword';

export const EditProfile = ({user}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm();

    const submitProfileForm = (data) => {
        console.log(data)
        dispatch(updateProfile(token,data));
    }

  return (
    <div className='flex flex-col my-10'>
        <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className=' flex flex-col  border-[1px] border-richblack-700 bg-richblack-800 rounded-md gap-y-6 p-8 px-12'>
                <h2 className='text-lg text-richblack-5 font-semibold'>
                    Profile Information
                </h2>
                <div className='flex flex-col lg:flex-row gap-5 '>
                    <div className='lg:w-[48%]'>
                        <label>
                            <p className='lable-style'>First Name</p>
                            <input
                                type='text'
                                name='firstName'
                                {...register("firstName",{required:true})}
                                placeholder='Enter first name'
                                defaultValue={user?.firstName}
                                readOnly
                                className='form-style w-full'
                            />
                        </label>
                    </div>
                    <div className='lg:w-[48%]'>
                        <label>
                            <p className='lable-style'>Last Name</p>
                            <input
                                type='text'
                                name='lastname'
                                placeholder='Enter last name'
                                {...register("lastname",{required:true})}
                                defaultValue={user?.lastName}
                                className='form-style w-full'
                            />
                        </label>
                        {
                            errors.lastname && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter last name
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='lg:w-[48%]'>
                        <label>
                            <p className='lable-style'>Date of Birth</p>
                            <input
                                type='date'
                                name='dateOfBirth'
                                className='form-style w-full'
                                {...register("dateOfBirth",{
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    }, 
                                })}
                                defaultValue={user?.additionalDetails?.DOB}
                            />
                        </label>
                        {
                            errors.dateOfBirth && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {errors.dateOfBirth.message}
                                </span>
                            )
                        }
                    </div>

                    <div className='lg:w-[48%]'>
                        <label className='lable-style'>
                            <p className='lable-style'>Gender</p>
                            <input
                                type='text'
                                name='gender'
                                className='form-style w-full'
                                placeholder='Enter your gender'
                                {...register("gender",{required:true})}
                                defaultValue={user?.additionalDetails?.gender}
                            />
                        </label>
                        {
                            errors.gender && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter your gender
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='phonenumber' className='lable-style'>Phone Number</label>
                    <div className='flex flex-col gap-5 lg:flex-row'>
                    
                        <div className='flex flex-row gap-5'>
                            <div className='flex flex-col gap-2 w-[81px]'>
                                <select
                                    name='countrycode'
                                    id='phonenumber'
                                    className='form-style'
                                    {...register("countrycode",{required:true})}
                                >
                                    {
                                        countrycode.map((ele,i) => (
                                            <option
                                            key={i} value={ele.code}
                                            >
                                                {ele.code} - {ele.country}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='w-[calc(100%-90px)]'>
                                <input
                                    type='number'
                                    name='conatctNumber'
                                    id='phonenumber'
                                    placeholder='Enter your number'
                                    {...register("contactNumber",{
                                        required:{
                                            value:true,
                                            message:"Please enter your number"
                                        },
                                        maxLength:{value:10, message:"Please enter valid number"},
                                        minLength:{value:10,message:"Please enter valid number"}
                                    })}
                                    className='form-style'
                                />
                            </div>
                        </div>
                        {
                            errors.contactNumber && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    {errors.contactNumber.message}
                                </span>
                            )
                        }
                    </div>
                    </div>

                    <div className='lg:w-[48%]'>
                        <label>
                            <p className='lable-style mb-2'>About</p>
                            <input
                                type='text'
                                name='about'
                                placeholder='Enter Bio details'
                                className='form-style w-full'
                                {...register("about",{required:true})}
                                defaultValue={user?.additionalDetails?.about}
                            />
                        </label>
                        {
                            errors.about && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please tell us something about you
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className='flex justify-end gap-2'>
                    <NavLink to="/dashboard/my-profile">
                        <button className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'>
                            Cancel
                        </button>
                    </NavLink>
                    <IconBtn
                        text="Save"
                        type = 'submit'
                    />
                </div>
            </div>
        </form>

        <ChangePassword/>

        <DeleteAccount/>
    </div>
  )
}
