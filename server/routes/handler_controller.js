const db = require('../db');

module.exports = {

    getAllPositions: async function (req, res, next){
                            try{
                                let results = await db.allpositions();
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        },
    getAllRoutes: async function (req, res, next){
                            try{
                                let results = await db.allroutes();
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        }, 
    getRoute: async function (req, res, next){
                            console.log("name: " + req.body.id);  
                            try{
                                let results = await db.getroute(id);
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                        }, 
    addRoute:    async function(req, res, next) {  
         
                            console.log("name: " + req.body.name);                            
                        
                            try{
                                let results = await db.addroute(req.body.name);
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            } 
                        }, 
    updateRouteName:   async function(req, res, next) {  
                            let ind = req.body.ind;
                            let name = req.body.name;
                           
                            console.log("ind: " + req.body.ind);
                            console.log("name: " + req.body.name);                           
                        
                            try{
                                let results = await db.updateroute(ind, name);
                                res.json(results);
                            } catch(e){
                                console.log(e);
                                res.sendStatus(500);
                            }
                            
                        },                      

    
}