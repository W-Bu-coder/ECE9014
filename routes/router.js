const express = require('express');
const router = express.Router();
const coachController = require('./coach');
const gymController = require('./index');
const courseController = require('./course');
const coachCourseController = require('./coach-course');
const gymCoachController = require('./gym-coach');

// gym routes
router.get('/', gymController.getHomePage);
router.get('/add', gymController.getAddPage);
router.get('/edit/:id', gymController.getEditPage);
router.post('/edit/:id', gymController.editGym);
router.get('/delete/:id', gymController.deleteGym);

// coach routes
router.get('/coaches', coachController.getAllCoaches);
router.get('/coaches/add', coachController.getAddCoachPage);
router.post('/coaches/add', coachController.addCoach);
router.get('/coaches/edit/:id', coachController.getEditCoachPage);
router.post('/coaches/edit/:id', coachController.editCoach);
router.get('/coaches/delete/:id', coachController.deleteCoach);

// course routes
router.get('/courses', courseController.getAllCourses);
router.get('/courses/add', courseController.getAddCoursePage);
router.post('/courses/add', courseController.addCourse);
router.get('/courses/edit/:id', courseController.getEditCoursePage);
router.post('/courses/edit/:id', courseController.editCourse);
router.get('/courses/delete/:id', courseController.deleteCourse);


//relation routes
router.get('/coach-course', coachCourseController.getAllAssignments);
router.get('/gym-coach', gymCoachController.getAllAssignments);


module.exports = router;