const Course = require('../models/courseModel');
const User = require('../models/UserModel');
const Section = require('../models/sectionModel');
const SubSection = require('../models/subSectionModel');
const {uploadFileToCloudinary} = require('../util/imageUploader');
const Category = require('../models/categoryModel');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

exports.createCourse = async(req,res) => {
    try{
        
        let {
            name,
            status,
            description,
            whatuwillLearn,
            price,
            tag:_tag,
            category,
            instructions:_instructions
        } = req.body

        console.log("running")

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)
        console.log("after running")
        console.log(tag);

        // const thumbnail = req.files.thumbnailImage;

        if(!name || !description || !whatuwillLearn  || !price  || !category || !tag.length || !instructions.length){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            })
        }

        console.log(name);

        if (!status || status === undefined) {
            console.log("status")
			status = "Draft";
        }
        
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId,{
            accountType:"Instructor"
        });

        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"Instructor Deatils not found"
            })
        }

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(401).json({
                success:false,
                message:"Category is not present"
            })
        }


        // const imageUrl = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);

        const course = await Course.create({
            name,
            description,
            whatuwillLearn,
            instructor:instructorDetails._id,
            price,
            tag: tag,
            // language,
            // thumbnail:imageUrl.secure_url,
            category:categoryDetails._id,
            status:status,
            instructions: instructions,
            sold:0
            })

        console.log(course);

        await Category.findByIdAndUpdate({_id:category},
                                    {
                                        $push: {course:course._id}
                                    },
                                    {new:true}
                                );

        console.log("Before")

        await User.findByIdAndUpdate({_id:userId},
                                     {
                                        $push: {
                                            courses:course._id
                                        }
                                     },
                                     {new:true}
                                );

        console.log("Parmeet Singh")
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:course
        })

        
                                    

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Issue in creating course try again",
            data:error.message
        })
    }
}

exports.getAllCourses = async(req,res) => {
    try{

        const allCoursesDetails = await Course.find({},
                                                    { 
                                                        name:true,
                                                        price:true,
                                                        thumbnail:true,
                                                        language:true,
                                                        instructor:true,
                                                        ratingAndReviews:true,
                                                        studentEnrolled:true
                                                    }
                                                ).populate("instructor").exec();


         return res.status(200).json({
            success:true,
            message:"All course details fetched",
            data:allCoursesDetails
         })                                              
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in getting all course details try again"
        })
    }
}

exports.getCourseDetails = async(req,res) => {
    try{

        const {courseId} = req.body;

        if(!courseId){
            return res.status(500).json({
                success:false,
                message:"Course Id is required"
            })
        }

        const courseDetails = await Course.findById({_id:courseId})
                                                    .populate({
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subSection"
                                                        }
                                                    })
                                                    .populate("category")
                                                    .populate("ratingAndReviews")
                                                    .populate({
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails"
                                                        }
                                                    })
                                                    .exec();

        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message:`Can;t dind course with id ${courseId}`
            })
        }              
        
        return res.status(200).json({
            success:true,
            message:"Course deatils fetched successfully",
            data:courseDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't fetch course details",
            data:error.message
        })
    }
}

exports.getInstructorCourses = async(req,res) => {
    try{

        const instructorId = req.user.id;
        console.log("Instructor Id",instructorId);
        const instructorCourses = await Course.find(
            {instructor:instructorId}).sort({createdAt:-1});

        console.log(instructorCourses);

        res.status(200).json({
            success:true,
            data:instructorCourses
        })    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't fetch instructor courses",
            data:error.message
        })
    }
}


// to make changes after course creation in real
exports.deleteCourse = async(req,res) => {
    try{
        const courseId = req.body;

        if(!courseId){
            return res.status(500).json({
                success:false,
                message:"Provide course Id"
            })
        }

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(500).json({
                success:false,
                message:"Course not present"
            })
        }

        // remove enrolled students
        const studentEnrolled = course.studentEnrolled;

        for(const studentId of studentEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses:courseId}
            })
        }

        //delete sub-sections and sections

        const sections = course.courseContent;
        for(const sectionId of sections){
            const section = await Section.findById(sectionId);
            if(section){
                const subsection = section.subSection;
                for(const subsectionId of subsection){
                    await SubSection.findByIdAndDelete(subsectionId);
                }

                await Section.findByIdAndDelete(sectionId);
            }
        }

        // delete course

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Not able to delete course",
            data:err.message
        })
    }
}

exports.editCourse = async(req,res) => {
    try{

        const { courseId } = req.body

        const updates = req.body

        const course = await Course.findById(courseId);

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                }
                else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById({_id:courseId})
                                                .populate({
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additionalDetails",
                                                    }
                                                })
                                                .populate("category")
                                                .populate("ratingAndReviews")
                                                .populate({
                                                    path: "courseContent",
                                                    populate: {
                                                      path: "subSection",
                                                    },
                                                })
                                                .exec()

         res.status(200).json({
            success:true,
            message:"Course updated",
            data:updatedCourse
         })                                                                            
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Can't edit course",
            data:error.message
        })
    }
}

