const nodemailer = require('nodemailer');

require('dotenv').config();

const mailSender = async(email,title,body) => {
    try{

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:587,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
            from:process.env.MAIL_USER
        })

        let info = await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:`${email}`,
            subject:`${title}`,
            text: "Hello. This email is for your email verification.",
            html:`${body}`
        })
        // console.log("info",info);
        return info;

    }
    catch(err){
        console.log(err);
    }
}

module.exports = mailSender;