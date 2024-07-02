const mongoose = require('mongoose');


const conatactSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:true,
            trim:true
        },
        lastname:{
            type:String,
            trim:true
        },
        email:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("Contact",conatactSchema);