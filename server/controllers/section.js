const Section = require("../models/sectionModel");
const Course = require('../models/courseModel');

exports.createSection = async(req,res) => {
    try{

        const {name,courseId} = req.body;

        if(!name || !courseId){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            })
        }

        const newSection = await Section.create({name});

        const updatedCourse = await Course.findByIdAndUpdate({_id:courseId},
                                       {
                                        $push: {courseContent:newSection._id}
                                       },
                                       {new:true} 
                                    )
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            data:updatedCourse
        })                            

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Issue in creating section",
            data:error.message
        })
    }
}

exports.updateSection = async(req,res) => {
    try{

        const {name,sectionId,courseId} = req.body;

        if(!name || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                                {
                                                                    name:name
                                                                },
                                                                {new:true}
                                                            );

        const updatedCourse = await Course.findById(courseId)
                                           .populate({
                                            path:"courseContent",
                                            populate: {
                                                path:"subSection"
                                            }
                                           }).exec()

        console.log(updatedCourse)


        
        return res.status(200).json({
            success:true,
            message:"Section name updated successfully",
            data:updatedCourse
        })                                                    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in updating section name try again",
            data:error.message
        })
    }
}


exports.deleteSection = async(req,res) => {
    try{

        const {sectionId} = req.body;

        if(!sectionId){
            return res.status(401).json({
                success:false,
                message:"Section Id is required"
            })
        }

        await Course.findOneAndUpdate({
            courseContent:{$elemMatch : {$eq : sectionId}}
        },
        {
            $pull:{
                courseContent:sectionId
            }
        },
        {
            new:true
        })

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"Section deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in deleting section",
            data:error.message
        })
    }
}