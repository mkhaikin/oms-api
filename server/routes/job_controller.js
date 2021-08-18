const db = require('../db');

module.exports = {
/*
    getAllJobs: async function (req, res, next)  {
                                    try{
                                        let results = await db.allusers();
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },

    getJobsByRouteId: async function(req, res, next) {
                                    try{
                                        let results = await db.userByPositionID(req.params.id);
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },

    getJobByDriverId: async function(req, res, next){
                                    try{
                                        let results = await db.userByLastName(req.params.lastname);
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },
    getJobByDate: async function(req, res, next) {
                                    try{
                                        let results = await db.userByFullName(req.params.firstname, req.params.lastname);
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },
*/                                
    addJob :    async function(req, res, next) {  
                                    let routeId = req.body.route;
                                    let driverId = req.body.driver;
                                    let datestr = req.body.scheduled;
                                   
                                    /*
                                    console.log("routeId: " + routeId);
                                    console.log("driverId: " + driverId);
                                    console.log("datestr: " + datestr);
                                     */                               
                                    try{
                                        let results = await db.addjob(routeId, driverId, datestr);
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                    
                                },
    getJobsTodayFuture: async function (req, res, next)  {
                                    try{
                                        let results = await db.jobsTodayFuture();
                                        //console.log("getJobsTodayFuture: "+ JSON.stringify(results));
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },
    getJobsToday: async function (req, res, next)  {

        console.log("!!!!!!!!!!!!!!job_controller getJobsToday: " + req.user.email);
                                    try{
                                        let results = await db.jobsForToday(req.user.email);
                                        //console.log("getJobsTodayFuture: "+ JSON.stringify(results));
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },
    getJobsThisWeek: async function (req, res, next)  {
        //console.log("getJobsThisWeek---->")
                                    try{
                                        let results = await db.jobsThisWeek();
                                        //console.log("getJobsTodayFuture: "+ JSON.stringify(results));
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },                                 
    deleteJobById: async function (req, res, next) {
                                    try{
                                        console.log("--------> deleteJobById, id: " + req.params.ind);
                                        let results = await db.deleteJobByID(req.params.ind);
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },                                 
                             
    updateJob :    async function(req, res, next) {  
                                    let ind = req.body.ind;
                                    let jobdate = req.body.scheduled;
                                    let route = req.body.route;
                                    let driver = req.body.driver;
                                    
                                    console.log("ind: " + req.body.ind);
                                    console.log("jobdate: " + req.body.jobdate);
                                    console.log("route: " + req.body.route);
                                    console.log("driver: " + req.body.driver);
                                                                    
                                    try{
                                        let results = await db.updatejob( ind, jobdate, route, driver);
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                    
                                }, 
                                
    getDriverJobsToday: async function (req, res, next)  {

        console.log("!!!!!!!!!!!!!!job_controller getJobsToday: " + req.user.email);
                                    try{
                                        let results = await db.driverJobsForToday(req.user.email);
                                        //console.log("getJobsTodayFuture: "+ JSON.stringify(results));
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },
    getDriverJobsThisWeek: async function (req, res, next)  {
        console.log("!!!!!!!!!!!!!!job_controller getDriverJobsThisWeek: " + req.user.email);
                                    try{
                                        let results = await db.driverJobsThisWeek(req.user.email);
                                        //console.log("getJobsTodayFuture: "+ JSON.stringify(results));
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                }, 
    getDriverJobsTodayFuture: async function (req, res, next)  {
        console.log("!!!!!!!!!!!!!!job_controller getDriverJobsThisWeek: " + req.user.email);
                                    try{
                                        let results = await db.driverJobsTodayFuture(req.user.email);
                                        //console.log("getJobsTodayFuture: "+ JSON.stringify(results));
                                        res.json(results);
                                    } catch(e){
                                        console.log(e);
                                        res.sendStatus(500);
                                    }
                                },                                    
                                                           
}