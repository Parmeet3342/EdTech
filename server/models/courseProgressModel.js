const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema(
    {
        course_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        completedVideos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Videos"
        }]
    }
)

module.exports = mongoose.model("Course_Progress",courseProgressSchema);