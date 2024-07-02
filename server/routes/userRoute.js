const express = require('express');
const router = express.Router();

const {
    login,
    signUp,
    sendOTP,
    changePassword
} = require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/resetPassword');

const {auth} = require('../middlewares/auth');

router.post('/login',login);
router.post('/sendOtp',sendOTP);
router.post('/signUp',signUp);
router.put('/changePassword',auth,changePassword);

//try by changing post to put
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);

module.exports = router;