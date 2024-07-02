const mongoose = require('mongoose');
const otpTemplate = require('../mail/template/otpEmail');
const mailSender  = require('../util/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5 // change position and then test
    },
    otp:{
        type:String,
        required:true
    }
})

async function sendVerificationEmail(email,otp){
    try{
        
        const mailResponse = await mailSender(email,"Verification mail from StudyNotion",otpTemplate(otp));
        console.log("Email sent successfully: ",mailResponse);
    }
    catch(error){
        console.log("Issue occured while sending mail",error);
        throw error;
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);