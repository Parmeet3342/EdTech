const express = require('express');
const router = express.Router();

const {
    capturePayment,
    verifySignature
} =require('../controllers/payment');

const {auth ,isStudent} = require('../middlewares/auth');

router.post('/capturePayment',auth,isStudent,capturePayment);
router.post("/verifySignature",verifySignature);

module.exports = router;