const User = require('../models/UserModel');
const mailSender = require('../util/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.resetPasswordToken = async(req,res) => {
    try{

        console.log("running");
        const {email} = req.body;

        console.log(email);
        let user = await User.findOne({email:email});

        console.log(user);
        //chechUserPresentorNot
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User does not exist"
            })
        }

        //generateToken
        let token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await User.findOneAndUpdate(
                                                        {email:email},
                                                        {
                                                         token:token,
                                                         resetPasswordExpires:Date.now() + 5*60*1000
                                                        },
                                                        {new:true})                                              

        //generateLink
        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email,"Link to reset password",`Password reset Link: ${url}`);
        
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check email and change password"
        })

    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"Issue in creating token",
            data:error.message
        })
    }
}


exports.resetPassword = async (req,res) => {
    try{

        const {password,confirmPassword,token} = req.body;
        
        if(!password || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Fill all the fields"
            })
        }

        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Passwords did not match try again"
            })
        }

        let user = await User.findOne({token:token});
        
        if(!user){
            return res.status(500).json({
                success:false,
                message:"Token is invalid"
            })
        }

        if(!(user.resetPasswordExpires > Date.now())){
            return res.status(500).json({
                success:false,
                message:"Token expired, regenerate token"
            })
        }

        let hashPassword;
        try{

            hashPassword = await bcrypt.hash(password,10);

        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Issue in hashing password"
            })
        }

        await User.findOneAndUpdate({token:token},
                                    {password:hashPassword},
                                    {new:true});
        
        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })                            
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
            data:"Something went wrong while sending change pwd mail"
        })
    }
}