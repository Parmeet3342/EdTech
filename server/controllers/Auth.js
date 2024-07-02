const OTP = require('../models/otpModel');
const User = require('../models/UserModel');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/profileModel');
const jwt = require('jsonwebtoken');
const { passwordUpdated } = require('../mail/template/passwordUpdate');
const mailSender = require('../util/mailSender');

//sendOTP

exports.sendOTP = async(req,res) => {
    try{

        const {email}  = req.body;
        console.log(email);

        const existingUser = await User.findOne({email});
        console.log(existingUser);

        if(existingUser){
            return res.status(500).json({
                success:false,
                message:"User already exists"
            })
        }

        console.log("running")
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log(otp);

        let result = await OTP.findOne({otp});

        console.log(otp);
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            result = await OTP.findOne({otp});
        }

        console.log(otp);
        const otpBody = await OTP.create({
            email,
            otp
        })

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Issue in sending OTP"
        })
    }
}

//SignUp

exports.signUp = async(req,res) => {
    try{

        const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        phoneNumber,
        otp
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType){
            return res.status(500).json({
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

        const userAlreadyPresent = await User.findOne({email});

        if(userAlreadyPresent){
            return res.status(500).json({
                success:false,
                message:"User already exists"
            })
        }

        let recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);

        if (recentOTP.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== recentOTP[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

        let hashPassword;
        try{
            hashPassword =await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Issue in hashing password"
            })
        }

        const profileDetails = await Profile.create({
            gender:null,
            DOB:null,
            about:null,
            phoneNumber:phoneNumber
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            accountType,
            additionalDetails:profileDetails._id,
            imageUrl:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"SignUp successfull",
            user
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Can't SignUp"
        })
    }
}

//login

exports.login = async(req,res) => {
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email:email})
        .populate({
            path:"additonalDetails",
            strictPopulate:false
        });

        if(!user){
            return res.status(500).json({
                success:false,
                message:"User is not registered please signUp fisrt"
            })
        }

        if(await bcrypt.compare(password,user.password)){

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }

            

            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"24h"
                                }
                            )

            user.token = token;
            user.password = undefined;

            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Login successfull",
                token,
                user
            })

        }
        else{
            return res.status(500).json({
                success:false,
                message:"Password is incorrect"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Can't login"
        })
    }
}

exports.changePassword = async(req,res) => {
    try{

        const {oldPassword,newPassword} =req.body;
        console.log(oldPassword,newPassword);

        // let user = await User.findOne({password:oldPassword});

        const userDetails = await User.findById(req.user.id);

        console.log("User Details are",userDetails);

        if(!oldPassword || !newPassword){
            return res.status(500).json({
                success:false,
                message:"Fill all fields"
            })
        }

        console.log("before running");
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
          )

          console.log(isPasswordMatch);
          if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
              .status(401)
              .json({ success: false, message: "The password is incorrect" })
          }
        console.log("running")
        let hashPassword = await bcrypt.hash(newPassword,10);

        const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: hashPassword },
			{ new: true }
		);

        try{

            //make template change
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                'Password for your account has been updated',
                passwordUpdated( 
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response)
        }
        catch (error) {
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });


    }
    catch(error){
        return res.status(500).json({
            success:true,
            message:"Issue in changing password",
            data:error.message
        })
    }
}