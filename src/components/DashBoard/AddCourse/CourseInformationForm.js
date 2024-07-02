import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { ChipInput } from './ChipInput'
import { useDispatch, useSelector } from 'react-redux'
import { Requirements } from './Requirements'
import { IconBtn } from '../../common/IconBtn'
import toast from 'react-hot-toast'
import {setStep,setCourse} from '../../../slices/courseSlice'

import { 
    fetchCourseCategories,
    editCourseDetail,
    addCourseDetail
} from '../../../services/operations/courseDetailApi'

export const CourseInformationForm = () => {
    const [loading,setLoading] = useState(false);
    const [category,setCategory] = useState([]);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);


    const {editCourse,course} = useSelector((state) => state.course)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm();

    useEffect(() => {
        const fetchCategory = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories()
            if(categories.length > 0){
                setCategory(categories);
            }
            // console.log("this is",categories);
            setLoading(false);
            console.log(categories);
        }
        fetchCategory();

        if(editCourse){
            setValue("courseTitle",course?.name)
            setValue("courseShortDesc",course?.description)
            setValue("coursePrice",course?.price)
            setValue("courseCategory",course?.category)
            setValue("courseTags",course?.tag)
            setValue("courseBenefits",course?.whatuwillLearn)
            setValue("courseRequirements",course?.instructions)
        }
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if(
            currentValues.courseTitle !== course.name ||
            currentValues.courseShortDesc !== course.description ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatuwillLearn ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
        ){
            return true
        }
        return false
    }

    const onSubmit = async (data) => {
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId",course._id)

                if(currentValues.courseTitle !== course.name){
                    formData.append("name", data.courseTitle)
                }
                if(currentValues.courseShortDesc !== course.description){
                    formData.append("description",data.courseShortDesc)
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price",data.coursePrice)
                }
                if(currentValues.courseCategory !== course.category){
                    formData.append("category",data.courseCategory)
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if(currentValues.courseBenefits !== course.whatuwillLearn){
                    formData.append("whatuwillLearn", data.courseBenefits)
                }
                if(currentValues.courseRequirements.toString() !== course?.instructions){
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }

                setLoading(true)
                const result = await editCourseDetail(formData,token)
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made to the form");
            }
            return;
        }

        const formData = new FormData();

        formData.append("name",data.courseTitle)
        formData.append("description",data.courseShortDesc)
        formData.append("price",data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("category",data.courseCategory)
        formData.append("whatuwillLearn",data.courseBenefits)
        formData.append("instructions",JSON.stringify(data.courseRequirements))
        formData.append("status", "Draft")

        setLoading(true)
        const result = await addCourseDetail(formData,token)
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false)
    }

  return (
    <div className='w-[80%] ml-10'>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='bg-richblack-800 rounded-md p-6 space-y-4'>
           <div>
                <label>
                <p className='lable-style mb-1'>Course Title<sup>*</sup></p>
                <input
                    type='text'
                    name='courseTitle'
                    placeholder="Enter course title"
                    {...register("courseTitle",{required:true})}
                    className='form-style w-full'
                />
                </label>
                {
                    errors.courseTitle && (
                        <span>
                            Please enter your course title
                        </span>
                )
            }
           </div>
           <div>
                <label>
                <p className='lable-style mb-1'>Course Short Description<sup>*</sup></p>
                <textarea
                    name='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc",{required:true})}
                    className=' min-h-[130px] form-style w-full '
                />
                </label>
                {
                    errors.courseShortDesc && (
                        <span>
                            Please enter description
                        </span>
                    )
                }
           </div>
            <div>
                <label className='relative'>
                <p className='lable-style mb-1'>Price<sup>*</sup></p>
                <input
                    name='coursePrice'
                    placeholder='Enter Course Price'
                    {...register("coursePrice",{
                        required:true,
                        valueAsNumber:true,
                        pattern:{
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        }
                    })}
                    className='form-style w-full px-10'
                />
                <HiOutlineCurrencyRupee fontSize={24} className='absolute top-[38px] left-2'/>
                </label>
                {
                    errors.coursePrice && (
                        <span className='text-richblack-5'>
                            Please enter price
                        </span>
                    )
                }
            </div>
            <div>
                <label>
                    <p className='lable-style mb-1'>Category<sup>*</sup></p>
                    <select
                    {...register("courseCategory",{required:true})}
                    defaultValue=""
                    name='courseCategory'
                    className='form-style w-full'
                    >
                       <option value="" disabled>
                        Choose a category
                       </option>
                       {
                        !loading && 
                           category.map((cat,index) => (
                            <option value={cat?._id} key={index} className='text-richblack-5'>
                                {cat?.name}
                            </option>
                           ))
                       }
                    </select>
                </label>
                {
                    errors.courseCategory && (
                        <span className='text-richblack-5'>
                            Please enter course category
                        </span>
                    )
                }
            </div>
            <div>
                <ChipInput
                    label = "Tags"
                    name = "courseTags"
                    placeholder = "Enter tags and press enter"
                    register = {register}
                    errors = {errors}
                    setValue = {setValue}
                    getValues = {getValues}
                />
            </div>

            {/* <div>
                <Upload
                    name="courseImage"
                    lable ="Course Thumbnail"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={editCourse ? course?.thumbnail : null}
                />
            </div> */}

            <div>
                <label>
                    <p className='lable-style mb-1'>Benefits of the course<sup>*</sup></p>
                    <textarea
                        name='courseBenefits'
                        placeholder='Enter benefits of the course'
                        {...register("courseBenefits",{required:true})}
                        className='form-style w-full min-h-[130px]'
                    />
                </label>
                {
                    errors.courseBenefits && (
                        <span>
                            Enter the course benefits
                        </span>
                    )
                }
            </div>

            <Requirements
                name = "courseRequirements"
                register={register}
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />

            <div className='flex justify-end gap-x-2'>
                {
                    editCourse && (
                        <button 
                        disabled = {loading}
                        onClick={dispatch(setStep(2))}
                        className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
                            Continue Without Saving
                        </button>
                    )
                }
                <IconBtn
                    type='submit'
                    text={!editCourse ? "Next":"Save Changes"}
                />
            </div>
        </form>
    </div>
  )
}
