const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/UserModel');

//authentication

exports.auth = async(req,res,next) => {
    try{

        const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            }) 
        }

        try{

            const payload = jwt.verify(token,process.env.JWT_SECRET);
           

            req.user = payload;
			console.log(req.user)
        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:"Can't verify token",
                data:err.message
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Something went wrong while verifying token"
        })
    }
}

exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};