const express = require('express');
const router = express.Router();

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getInstructorCourses,
    deleteCourse,
    editCourse
} = require('../controllers/courses');

const {
    createCategory,
    getAllCategory,
    getCategoryDetails
} =require('../controllers/Category');

const {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/section');

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} =require('../controllers/subSection');

const {
    createRating,
    getAllRatings,
    getAverageRatings
} =require('../controllers/ratingAndReview');

const {auth,isInstructor,isStudent,isAdmin} = require('../middlewares/auth');
const { get } = require('mongoose');

router.post('/createCourse',auth,isInstructor,createCourse);
router.post('/createSection',auth,isInstructor,createSection);
router.put('/updateSection',auth,isInstructor,updateSection);
router.delete('/deleteSection',auth,isInstructor,deleteSection);
router.post('/createSubSection',auth,isInstructor,createSubSection);
router.put('/updateSubSection',auth,isInstructor,updateSubSection);
router.delete('/deleteSubSection',auth,isInstructor,deleteSubSection);
router.get('/getCourses',getAllCourses);
router.get('/getCourseDetails',getCourseDetails);
router.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);
router.get('/deleteCourse',deleteCourse);
router.get('/editCourse',auth,isInstructor,editCourse)



router.post('/createCategory',auth,isAdmin,createCategory);
router.get('/getAllCategories',getAllCategory);
router.get('/categoryDetails',getCategoryDetails);


router.post('/createRating',auth,isStudent,createRating);
router.get('/getAllRating',getAllRatings);
router.get('/getAverageRating',getAverageRatings);

module.exports = router;