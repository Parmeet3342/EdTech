const mongoose = require('mongoose');

require('dotenv').config();

const connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DB connection successfull"))
    .catch((error) => {
        console.log("Issue in DB connection");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = connect;