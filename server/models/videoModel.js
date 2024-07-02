const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        duration:{
            type:String,
            required:true
        },
        videoUrl:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("Videos",videoSchema);