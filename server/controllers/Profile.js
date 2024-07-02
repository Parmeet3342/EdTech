const Profile = require("../models/profileModel");
const User = require("../models/UserModel");
const Course = require('../models/courseModel');
const {uploadFileToCloudinary} = require('../util/imageUploader');
require('dotenv').config();

exports.createProfile = async(req,res) => {
    try{
        console.log("running")
        const {gender = "",contactNumber,dateOfBirth = "",about = "",lastname = ""} =req.body;
        console.log(gender);
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        const user = await User.findByIdAndUpdate(userId,{
            lastName:lastname
        },
        {new:true}
       )
        console.log(user);

        await user.save();

        const profile = await Profile.findById(userDetails.additionalDetails);
        console.log(profile);

        profile.gender = gender;
        profile.DOB = dateOfBirth;
        profile.contactNumber = contactNumber;
        profile.about = about;

        await profile.save();

        console.log("After Saving",profile)

        const updatedUserDetails = await User.findById(userId)
        .populate("additionalDetails")
        .exec()
        console.log(updatedUserDetails);

        return res.status(200).json({
            success:true,
            message:"Profile information added successfully",
            data:updatedUserDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in adding profile deatils",
            data:error.message
        })
    }
}

exports.deleteAccount = async(req,res) => {
    try{

        const userId = req.user.id;

        console.log(userId);

        const user = await User.findById(userId);
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User does not exist"
            })
        }
        console.log("running");

        await Profile.findByIdAndDelete({_id:user.additionalDetails});

        // to unenroll user from enrolled courses
        const courses = user.courses;
        for(let course of courses){
            await Course.findByIdAndUpdate({_id:course},
            {
                $pull:{
                    studentEnrolled:userId
                }
            })
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error occured while deleting account try again",
            data:error.message
        })
    }
}

exports.getUserAllDetails = async(req,res) => {
    try{

        const userId = req.user.id;

        const userDetails = await User.findById(userId)
                                               .populate("additionalDetails").exec();
 
        return res.status(200).json({
            success:true,
            message:"All user deatails fetched successfully",
            data:userDetails
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't fetch user details",
            data:error.message
        })
    }
}



exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.profileImage
      const userId = req.user.id
      const image = await uploadFileToCloudinary(
        displayPicture,process.env.FOLDER_NAME,1000,1000
      );
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { imageUrl: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

exports.getEnrolledCourses = async(req,res) => {
    try{

        const userId = req.user.id;

        const userDetails = await User.findById(userId)
                                               .populate("courses")
                                               .exec();
                                      
        return res.status(200).json({
            success:true,
            message:"Fetched all enrolled courses of user",
            data:userDetails.courses
        })                                       
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while getting enrolled courses",
            data:error.message
        })
    }
}