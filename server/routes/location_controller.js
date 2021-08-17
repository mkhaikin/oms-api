const db = require('../db');

module.exports = {

    getAllLocations: async function (req, res, next){
                            try{
                                let results = await db.alllocations();
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },

    getLocationById: async function (req, res, next) {
                            try{
                                let results = await db.locationByID(req.params.id);
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },

    getLocationsByRouteID: async function(req, res, next) {
                            try{
                                let results = await db.locationsByRouteID(req.params.id);
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },

    getLocationsByArea: async function(req, res, next){
                            try{
                                let results = await db.locationsByArea(req.params.areaname);
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },
    addLocation:    async function(req, res, next) {  
    
                        let routeId = req.body.routeId;
                        let area = req.body.area;
                        let street_avenue = req.body.street_avenue;
                        let w_e = req.body.w_e;
                        let number = req.body.number;
                        let notice = req.body.notice;

                        console.log("routeId: " + req.body.routeId);
                        console.log("area: " + req.body.area);
                        console.log("street_avenue: " + req.body.street_avenue);
                        console.log("w_e: " + req.body.w_e);
                        console.log("number: " + req.body.number);
                        console.log("notice: " + req.body.notice);
                    
                        try{
                            let results = await db.addlocation(routeId, area, street_avenue, w_e, number,notice);
                            res.json(results);
                        } catch(e){
                            console.log(e);
                            res.sendStatus(500);
                        }
                        
                    }, 
    updateLocation:   async function(req, res, next) {  
                        let ind = req.body.ind;
                        let routeId = req.body.routeId;
                        let area = req.body.area;
                        let street_avenue = req.body.street_avenue;
                        let w_e = req.body.w_e;
                        let number = req.body.number;
                        let notice = req.body.notice;

                        console.log("ind: " + req.body.ind);
                        console.log("routeId: " + req.body.routeId);
                        console.log("area: " + req.body.area);
                        console.log("street_avenue: " + req.body.street_avenue);
                        console.log("w_e: " + req.body.w_e);
                        console.log("number: " + req.body.number);
                        console.log("notice: " + req.body.notice);
                    
                        try{
                            let results = await db.updatelocation(ind, routeId, area, street_avenue, w_e, number,notice);
                            res.json(results);
                        } catch(e){
                            console.log(e);
                            res.sendStatus(500);
                        }
                        
                    }, 
    deleteLocationById: async function (req, res, next) {
                        try{
                            console.log("deleteLocationById, id: " + req.params.id);
                            let results = await db.deletelocationByID(req.params.id);
                            res.json(results);
                        } catch(e){
                            console.log(e);
                            res.sendStatus(500);
                        }
                    },  
            

}