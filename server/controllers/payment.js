const { default: mongoose } = require('mongoose');
const Course = require('../models/courseModel');
const { instance } = require('../config/Razorpay');
const User = require('../models/UserModel');
const { courseEnrollmentEmail } = require('../mail/template/courseEnrollmentEmail');

exports.capturePayment = async(req,res) => {

    const {courseId} = req.body;
    const userId = req.user.id;

    if(!courseId){
        return res.status(404).json({
            success:false,
            message:"Course Id is required"
        })
    }

    let course;
    try{

        course = await Course.findById(courseId);

        if(!course){
            return res.status(401).json({
                success:false,
                message:"Course not found"
            })
        }

        const uid = await mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.status(401).json({
                success:false,
                message:"User already paid for the course"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Issue in fetching course details",
            data:error.message
        })
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
        amount:amount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId,
            userId
        }
    }

    try{

        const paymentResponse = await instance.orders.create(options);

        return res.status(200).json({
            success:true,
            courseName:course.name,
            courseDescription:course.description,
            thumbnail:course.thumbnail,
            currency:paymentResponse.currency,
            orderId:paymentResponse.id,
            amount:paymentResponse.amount,
            message:"Order created successfully",

        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Could not initiate order"
        })
    }
}

exports.verifySignature = async(req,res) => {

    const webHookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature == digest){

        const {userId,courseId} = req.body.payload.payment.entity.notes;

       try{
            const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},
                {
                    $push:{
                    studentEnrolled:userId
                    },
                    $inc:{
                        sold:1
                    }
                },
                {new:true}
            )
            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }

            const enrolledStudent = await User.findByIdAnUpdate({_id:userId},
                {
                    $push:{
                        courses:courseId
                    }
                },
                {new:true}
            )

            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from CodeHelp",
                courseEnrollmentEmail(enrolledCourse.name,enrolledStudent.name),
            );

            return res.status(200).json({
                success:true,
                message:"Signature verified and course added"
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    else{
        return res.status(500).json({
            success:false,
            message:"Signature did not match"
        })
    }
}