const express = require('express');
const router = express.Router();

const {
    createProfile,
    deleteAccount,
    getUserAllDetails,
    updateDisplayPicture,
    getEnrolledCourses
} = require('../controllers/Profile');

const {auth} = require('../middlewares/auth');

router.put('/updateProfile',auth,createProfile);
router.delete('/deleteAccount',auth,deleteAccount);
router.get('/getDetails/user',auth,getUserAllDetails);
router.put("/updatePicture", auth,updateDisplayPicture)
router.get('/enrolledCourses',auth,getEnrolledCourses);

module.exports = router;