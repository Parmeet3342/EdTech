const RatingAndReviews = require('../models/ratingAndReviewsModel');
const Course = require('../models/courseModel');
const { default: mongoose } = require('mongoose');

exports.createRating = async(req,res) =>{
    try{

        const {rating,reviews,courseId} = req.body;

        const userId = req.user.id;

        if(!courseId){
            return res.status(500).json({
                success:false,
                message:"Course id required"
            })
        }

        //check if user enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
               studentEnrolled:{$elemMatch : {$eq:userId}},
            });

        if(!courseDetails){
            return res.status(500).json({
                success:false,
                message:"User is not enrolled in course"
            })
        }    

        //check if user already rated course

        const alreadyRated = await RatingAndReviews.findOne({
            userId,
            courseId
        })

        if(alreadyRated){
            return res.status(500).json({
                success:false,
                message:"User already rated course"
            })
        }

        const userRating = await RatingAndReviews.create({
            rating,
            reviews,
            user:userId,
            course:courseId
        })

        const updateCourse = await Course.findByIdAndUpdate({_id:courseId},
        {
            $push:{
                ratingAndReviews:userRating._id
            }
        },
        {new:true}
    )

        return res.status(200).json({
            success:true,
            message:"Rating and review added successfully",
            userRating
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in rating and reviewing course",
            data:error.message
        })
    }
}

exports.getAllRatings = async(req,res) => {
    try{

        const allRatingsReviews = await RatingAndReviews.find({}) 
                                                            .sort({rating:"desc"})
                                                            .populate({
                                                                path:"user",
                                                                select:"firstName lastName email imageUrl"
                                                            })
                                                            .populate({
                                                                path:"courses",
                                                                select:"name"
                                                            })
                                                            .exec();
         
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews fetched",
            data:allRatingsReviews
        })                                                    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in fetching ratings and reviews",
            data:error.message
        })
    }
}

exports.getAverageRatings = async(req,res) => {
    try{
        
        const {courseId} = req.body;

        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId)
                },
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                message:"Average rating claculated",
                averageRating:result[0].averageRating
            })
        }
        
        //if no rating is given
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Can't get average rating",
            data:error.message
        })
    }
}