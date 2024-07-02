const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        whatuwillLearn:{
            type:String
        },
        language:{
            type:String,
            // required:true
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        thumbnail:{
            type:String,
            // required:true
        },
        price:{
            type:Number,
            required:true
        },
        courseContent:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }],
        studentEnrolled:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        tag:{
            type:[String],
            required:true
        },
        ratingAndReviews:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews"
        }],
        instructions:{
            type:[String]
        },
        status:{
            type:String,
            enum:["Draft","Published"]
        },
        sold:{
            type:Number
        },
        createdAt: { type: Date, default: Date.now },
    }
)

module.exports = mongoose.model("Course",courseSchema);