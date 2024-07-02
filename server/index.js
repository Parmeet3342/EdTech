const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

//all routes

const userRoute = require('./routes/userRoute');
const courseRoute = require('./routes/courseRoute');
const profileRoute = require('./routes/profileRoute');
const paymentRoute = require('./routes/paymentRoute');
const contacRoute = require('./routes/contactRoute');

const database = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');



database();
//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

app.use(
    cors({
        origin:"*",
        credentials:true
    })
)

cloudinaryConnect();

app.use("/api/version3/auth",userRoute);
app.use("/api/version3/profile",profileRoute);
app.use("/api/version3/course",courseRoute);
app.use("/api/version3/payment",paymentRoute);
app.use("/api/version3/contact",contacRoute);


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT,() => {
    console.log(`App listening at ${PORT}`);
})