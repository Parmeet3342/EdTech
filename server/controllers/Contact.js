const Contact = require('../models/contactModel');

exports.contactUs = async(req,res) => {
    try{

        const {firstname,lastname,email,message} = req.body;

        if(!firstname || !email || !message){
            res.status(500).json({
                success:false,
                messsge:"Please enter all details"
            })
        }

        const contactDetails = await Contact.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            message:message
        })

        return res.status(200).json({
            success:true,
            message:"Message sent successfully",
            contactDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:"Can't contact"
        })
    }
}