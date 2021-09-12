const express = require('express');
const db = require('../db');
const {getAllUsers, getAllUsersIdName, getUserById, getUserByPositionId, getUserByLastName, getUserByFullName, addUser, updateUser} = require('./user_controller');
const {getAllLocations, getLocationById, getLocationsByRouteID, getLocationsByArea, addLocation, deleteLocationById, updateLocation} = require('./location_controller');
const {getAllPositions, getAllRoutes, addRoute, updateRouteName} = require('./handler_controller');
const {addJob, getJobsTodayFuture, deleteJobById, updateJob, getJobsThisWeek, getJobsToday, 
        getDriverJobsToday, getDriverJobsThisWeek, getDriverJobsTodayFuture} = require('./job_controller');
const {getAllWorklog, getWeekWorklog, getSummaryWorklog, addWorklog, getDriverWorklog} = require('./worklog_controller');
const { login, registration, logout, activate, refresh, access } = require('./access_controller');
const {todayjobs}  = require('./driver_controller');
const {body} = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')

const router = express.Router();
//-------------- GET

//-------------- users
router.get('/test/staff/users', (req, res, next) => getAllUsers(req, res, next)); //+

router.get('/staff/users', authMiddleware, (req, res, next) => getAllUsers(req, res, next)); //+
router.get('/staff/users/id', authMiddleware, (req, res, next) => getAllUsersIdName(req, res, next));  //+
router.get('/staff/users/:id', authMiddleware,  (req, res, next) => getUserById (req, res, next));  //+
router.get('/staff/users/position/:id', authMiddleware, (req, res, next) => getUserByPositionId(req, res, next));  //+

router.get('/staff/user/:lastname', (req, res, next) => getUserByLastName(req, res, next));
router.get('/staff/user/fullname/:firstname&:lastname', (req, res, next) => getUserByFullName(req, res, next));

//-------------- locations
router.get('/locations', authMiddleware, (req, res, next) => getAllLocations (req, res, next)); //+
router.get('/locations/:id', authMiddleware, (req, res, next) => getLocationById (req, res, next));  //+
router.get('/locations/route/:id',  authMiddleware, (req, res, next) => getLocationsByRouteID (req, res, next) ); //+
router.get('/locations/area/:areaname',  authMiddleware, (req, res, next) => getLocationsByArea (req, res, next) );  //+

//-------- positions
router.get('/staff/positions', authMiddleware, (req, res, next) => getAllPositions (req, res, next));  //+

//----------- routes

router.get('/routes', authMiddleware, (req, res, next) => getAllRoutes (req, res, next)); //+
router.get('/route', (req, res, next) => getAllRoutes (req, res, next)); // no sense
router.post('/route', authMiddleware, (req, res, next) => addRoute (req, res, next));
router.put('/route', authMiddleware, (req, res, next) => updateRouteName (req, res, next));

//---------- jobs
router.get('/job/dayfuture', authMiddleware, (req, res, next) => getJobsTodayFuture (req, res, next)); //+
router.get('/job/thisweek', authMiddleware, (req, res, next) => getJobsThisWeek (req, res, next)); //+
router.get('/job/today', authMiddleware, (req, res, next) => getJobsToday (req, res, next)); //+

router.get('/job/driver/dayfuture', authMiddleware, (req, res, next) => getDriverJobsTodayFuture (req, res, next)); //+
router.get('/job/driver/thisweek', authMiddleware, (req, res, next) => getDriverJobsThisWeek (req, res, next)); //+
router.get('/job/driver/today', authMiddleware, (req, res, next) => getDriverJobsToday (req, res, next)); //+



//----------- worklog
router.get('/worklog', authMiddleware, (req, res, next) => getAllWorklog (req, res, next)); //+
router.get('/worklog/week', authMiddleware, (req, res, next) => getWeekWorklog (req, res, next));  //+
router.get('/worklog/sum', authMiddleware, (req, res, next) => getSummaryWorklog (req, res, next));

router.get('/worklog/driver', authMiddleware, (req, res, next) => getDriverWorklog (req, res, next)); //+



//--------------- POST
router.post('/staff/user',  authMiddleware, (req, res, next) => addUser (req, res, next)); //+
router.post('/location', authMiddleware, (req, res, next) => addLocation (req, res, next));  //++
router.post('/job', authMiddleware, (req, res, next) => addJob (req, res, next)); //+
router.post('/worklog', authMiddleware, (req, res, next) => addWorklog (req, res, next)); //+


//----------------DELETE
router.delete('/locations/:id', (req, res, next) => deleteLocationById (req, res, next) );  //+
router.delete('/job/:ind', authMiddleware, (req, res, next) => deleteJobById(req, res, next) ); //+

//----------------PUT
router.put('/location', authMiddleware,(req, res, next) => updateLocation (req, res, next));  //+
router.put('/staff/user', authMiddleware,(req, res, next) => updateUser (req, res, next)); //+
router.put('/job', authMiddleware, (req, res, next) => updateJob (req, res, next)); //+
//router.put('/worklog', authMiddleware, (req, res, next) => UpdateWorklog (req, res, next)); //+


router.post('/registration', (req, res, next) => registration(req, res, next));
router.post('/login', (req, res, next) => login(req, res, next));
router.post('/login', (req, res, next) => getAllUsers(req, res, next));


router.post('/logout', (req, res, next) => logout(req, res, next));
router.get('/activate/:link', (req, res, next) => activate(req, res, next));
router.get('/refresh', (req, res, next) => refresh(req, res, next));
router.get('/access', (req, res, next) => access(req, res, next));

//driver job list
router.get('/driver/todayjobs',  authMiddleware, (req, res, next) => todayjobs(req, res, next)); //+


module.exports = router;