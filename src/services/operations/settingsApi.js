import toast from "react-hot-toast";
import { settingsEndpoint } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import {logout} from './authApi'


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    UPDATE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoint;

export function updateDisplayPicture(token, formData,setPreviewSource) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data.data))
      console.log(response.data.data.imageUrl);
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

export function updateProfile(token,data){
  return async(dispatch) => {
    const {lastname,gender,contactNumber,about,dateOfBirth} = data;
    const toastId = toast.loading("Loading...");
    try{

      const response = await apiConnector("PUT",
      UPDATE_PROFILE_API,
      {lastname,gender,contactNumber,about,dateOfBirth},
      {
        Authorization:`Bearer ${token}`
      })

      console.log("Update Response....",response);
      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Profile updated successfully");
      dispatch(setUser(response.data.data));
    }
    catch(error){
      console.log("UPDATE_Profile_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId);
  }
}

export function updatePassword(token,data){
  return async(dispatch) => {
    const {oldPassword,newPassword} = data;
    const toastId = toast.loading("Updating");
    try{
      const response = await apiConnector("PUT",
      UPDATE_PASSWORD_API,
      {oldPassword,newPassword},
      {
        Authorization:`Bearer ${token}`
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Updated Password")
    }
    catch(error){
      console.log("UPDATE_Profile_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId);
  }
  
}

export function deleteProfile(token,navigate){
  return async(dispatch) => {
    const toastId = toast.loading("Deleting...");
    try{

      const response = await apiConnector("DELETE",
        DELETE_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`
        }
      )
      console.log("Ok");

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Profile Deleted");
      dispatch(logout(navigate));
      console.log("running success")
    }
    catch(error){
      console.log("DELETE_Profile_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId);
  }
}

