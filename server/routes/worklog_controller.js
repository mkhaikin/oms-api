const db = require('../db');

module.exports = {

    addWorklog: async function (req, res, next){
        
        console.log("addWorklog, date: " + req.body.date);
        console.log("addWorklog, locationid: " + req.body.locationid);
        console.log("addWorklog, bag: " + req.body.bag);
        console.log("addWorklog, driverid: " + req.body.driverid);
                            try{
                                let results = await db.addWorklog(req.body.date,
                                                                    req.body.locationid,
                                                                    req.body.bag,
                                                                    req.body.driverid);
                                //console.log(results)
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },
    getAllWorklog: async function (req, res, next){
        
                            try{
                                let results = await db.getWorklog();
                                //console.log(results)
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },                        
    getWeekWorklog: async function (req, res, next){
        
                            try{
                                let results = await db.getWeekWorklog();
                                //console.log(results)
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },
    getSummaryWorklog: async function (req, res, next){
        
                            try{
                                let results = await db.getSummaryWorklog();
                                //console.log(results)
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },
    getDriverWorklog: async function (req, res, next){
        
        try{
            let results = await db.getDriverWorklog(req.user.email);
            //console.log(results)
            res.json(results);
        } catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    },  
}