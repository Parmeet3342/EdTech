const mongoose = require('mongoose');

const ratingReviewsSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        reviews:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Course",
            index: true,
        },
    }
)

module.exports = mongoose.model("RatingAndReviews",ratingReviewsSchema);