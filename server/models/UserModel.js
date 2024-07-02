const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true
        },
        lastName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number
        },
        accountType:{
            type:String,
            enum:["Admin","Student","Instructor"],
            required:true
        },
        token:{
            type:String
        },
        resetPasswordExpires:{
            type:Date
        },
        imageUrl:{
            type:String,
            required:true
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }],
        courseProgress:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course_Progress"
        }],
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Profile"
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",userSchema);