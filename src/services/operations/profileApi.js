import toast from "react-hot-toast";
import { profileEndpoint } from "../apis";
import { apiConnector } from "../apiconnector";

const {
    GET_USER_ENROLLEDCOURSE_API
} = profileEndpoint;

export function getUserEnrolledCourses(token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try{

            const response = await apiConnector("GET",
            GET_USER_ENROLLEDCOURSE_API,
            null,
            {
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success){
            throw new Error(response.data.message);
            }

            result = response.data.data;
        }
        catch(error){
            console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
            toast.error("Could Not Get Enrolled Courses")
        }
        toast.dismiss(toastId);
        return result;
    }
}