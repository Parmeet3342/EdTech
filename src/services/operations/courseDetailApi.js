import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
    GET_INSTRUCTOR_COURSE_API,
    DELETE_COURSE_API,
    GET_ALL_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    EDIT_COURSE_SECTION_API,
    CREATE_SECTION_API
} = courseEndpoints

export const fetchInstructorCourses = async (token) => {
        let result =[];
        const toastId = toast.loading("Loading...");
        try{

            const response = await apiConnector("GET",GET_INSTRUCTOR_COURSE_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;
        }
        catch(error){
            console.log("Fetch courses ERROR............", error)
            toast.error("Failed To fetch instructor courses")
        }
        toast.dismiss(toastId);
        return result;
}

export function deleteCourse(courseId,token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{

            const response = await apiConnector("DELETE",DELETE_COURSE_API,
                courseId,
                {
                    Authorization:`Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Course deleted successfully");
        }
        catch(error){
            console.log("Delete courses ERROR............", error)
            toast.error("Failed To Delete courses")
        }
        toast.dismiss(toastId);
    }   
}
 

export const fetchCourseCategories = async() => {
    let result = [];
    try{

        const response = await apiConnector("GET",GET_ALL_CATEGORIES_API)
        console.log("hello this is response",response.data.data);
        console.log("success is ",response.data.success)

        if(!response?.data.success){
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
        console.log(result);
        toast.success("Category fetched successfully");
    }
    catch(error){
        console.log("Fetch Api error",error);
        toast.error("Can't fetch categories");
    }
    return result;
}

export const  addCourseDetail = async (data,token) =>{
    let result = null
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("POST",CREATE_COURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization : `Bearer ${token}`
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data
        toast.success("Course added successfully")
    }
    catch(error){
        console.log("Add Course API error",error)
        toast.error("Cant add course");
    }
    toast.dismiss(toastId);
    return result
}

export const updateSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("POST",EDIT_COURSE_SECTION_API,
            data,
            {
                Authorization:`Bearer ${token}`
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data
        toast.success("Section updated successfully")
    }
    catch(error){
        console.log("Update Section API error",error);
        toast.error("Can't update section")
    }
    toast.dismiss(toastId)
    return result
}


export const editCourseDetail = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("POST",EDIT_COURSE_API,
            data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data
        toast.success("Course updated successfully")
    }
    catch(error){
        console.log("Edit course Api error",error)
        toast.error("Can't edit course")
    }
    toast.dismiss(toastId)
    return result
}

export const createSection = async (data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("POST",CREATE_SECTION_API,
            data,
            {
                Authorization:`Bearer ${token}`
            }
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data
        toast.success("Section created successfully")
    }
    catch(error){
        console.log("Create Section API erorr",error)
        toast.error("Not able to create error")
    }
    toast.dismiss(toastId)
    return result
}