const SubSection = require('../models/subSectionModel');
const Section = require('../models/sectionModel');
const {uploadFileToCloudinary} = require('../util/imageUploader');
require('dotenv').config();

exports.createSubSection = async(req,res) => {
    try{

        const {title,timeDuration,description,sectionId} = req.body;

        const videoFile = req.files.videoUrl;

        if(!title || !description || !videoFile || !sectionId || !timeDuration){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            })
        }

        const videoURL = await uploadFileToCloudinary(videoFile,process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({
            title,
            description,
            timeDuration,
            videoUrl:videoURL.secure_url
        })

        const sectionDetails = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {
                                                                    $push: {
                                                                        subSection:newSubSection._id
                                                                    }
                                                                },
                                                                {new:true}
                                                            ).populate("subSection");

        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            data:sectionDetails
        })                                                    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in creating sub-section",
            data:error.message
        })
    }
}


exports.updateSubSection = async(req,res) => {
    try{

        const {title,description,subSectionId} = req.body;

        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(500).json({
                success:false,
                message:"Subsection not found"
            })
        }

        if(title !== undefined){
            subSection.title = title;
        }
        if(description !== undefined){
            subSection.description = description;
        }

        const video = req.files.videoFile;

        if(video !== undefined){
            const videoResponse = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);

            subSection.videoUrl = videoResponse.secure_url;
            subSection.timeDuration = `${videoResponse.duration}`;
        }

        await subSection.save();

        return res.status(200).json({
            success:true,
            message:"Sub-section updated successfully",
            data:subSection
        })



        
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"Issue in updating subSection",
            data:error.message
        })
    }
}

exports.deleteSubSection = async(req,res) => {
    try{

        const {subSectionId} = req.body;

        if(!subSectionId){
            return res.status(500).json({
                success:false,
                message:"Sub-section id is required"
            })
        }

        await Section.findByIdAndDelete({_id:subSectionId},
        {
            $pull:{
                subSection:subSectionId
            }
        },
        {new:true}
        )

        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if(!subSection){
            return res.status(500).json({
                success:false,
                message:"Sub-section not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Sub-section is deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error in deleting sub-section",
            data:error.message
        })
    }
}