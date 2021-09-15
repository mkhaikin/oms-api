const mysql = require('mysql');
const q = require('./queries.sql');

/*
const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'binz',
    host: 'localhost'
});
*/
const pool = mysql.createPool({
    connectionLimit: 10,
    user:"b73fedc0eb286e",
    password:"14f55508",
    host:"us-cdbr-east-04.cleardb.com",
    database:"heroku_3ca7bafebfc5be2"
});

let sechandDB = {};

//---------- users
sechandDB.allusers = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ALL_USERS, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.allusersIdName = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ALL_USERS_ID_NAME, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.userByID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_USER_BY_ID, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.userByPositionID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_USER_BY_POSITION_ID, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.userByLastName = (lastname) => {
    return new Promise((resolve, reject) => {
        pool.query(q.SELECT_USER_BY_LAST_NAME, [lastname], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.userByFullName = (firstname, lastname) => {
    return new Promise((resolve, reject) => {
        pool.query(q.SELECT_USER_BY_FULL_NAME, [firstname, lastname], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

//------------- locations
sechandDB.alllocations = () => {
    return new Promise((resolve, reject) => {
        pool.query(q.SELECT_ALL_LOCATIONS, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.locationByID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_LOCATION_BY_ID, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.locationsByRouteID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_LOCATIONS_ROUTE_ID, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.locationsByArea = (area) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_LOCATIONS_BY_AREA, [area], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

//---------- positions
sechandDB.allpositions = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ALL_POSITIONS, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

//------------- routes
sechandDB.allroutes = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ALL_ROUTES, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getroute = (ind) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ROUTE, [ind],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
//----------- jobs
sechandDB.jobsTodayFuture = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SCHEDULED_JOBS_TODAY_FUTURE, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.jobsThisWeek = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SCHEDULED_JOBS_THISWEEK, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
//---------- worklog
sechandDB.addWorklog = (date, locationid, bag, driverid) => {
    //console.log("DB addWorklog------------start")
    return new Promise((resolve, reject) => {
        pool.query( q.INSERT_UPDATE_WORKLOG_TODAY, [date, locationid, bag, driverid], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


sechandDB.getWorklog = () => {
    //console.log("DB getWorklog------------start")
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ALL_WORKLOG, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getWeekWorklog = () => {
    console.log("DB getWeekWorklog------------start")
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_WEEK_WORKLOG, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getSummaryWorklog = () => {
    console.log("DB getWeekWorklog------------start")
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SUM_GROUPBY_WORKLOG, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getWorklogByLocation = (ind) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_LOCATION_WORKLOG, [ind],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getWorklogByMonth = (monthN) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_MONTH_WORKLOG, [monthN],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getWorklogByYear = (monthN) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_YEAR_WORKLOG, [monthN],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getWorklogByDateLocation = (yearN, monthN, locationId) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_LOCATION_MONTH_WORKLOG, [yearN, monthN, locationId],(err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getWorklogGroupByDateLocation = () => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SUM_GROUPBY_WORKLOG, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

//--------- POST
sechandDB.adduser = (firstname, lastname, email, cell, positionId) => {
    return new Promise((resolve, reject) => {
        pool.query( q.INSERT_NEW_USER, [firstname, lastname, email, cell, positionId], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.addlocation = (routeId, area, street_avenue, w_e, number, notice) => {
    return new Promise((resolve, reject) => {
        pool.query( q.INSERT_NEW_LOCATION, [routeId, area, street_avenue, w_e, number, notice], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.addjob = (routeId, driver, datestr) => {
    return new Promise((resolve, reject) => {
        pool.query( q.INSERT_NEW_JOB, [routeId, driver, datestr], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.addroute = (newroute) => {
    return new Promise((resolve, reject) => {
        pool.query( q.INSERT_NEW_ROUTE, [newroute], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


//////////////// PUT
sechandDB.updatelocation = (ind, routeId, area, street_avenue, w_e, number, notice) => {
    return new Promise((resolve, reject) => {
        pool.query( q.UPDATE_LOCATION_BY_ID, [ routeId, area, street_avenue, w_e, number, notice, ind], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.updateuser = (ind, firstname, lastname, email, cell, positionId) => {
    return new Promise((resolve, reject) => {
        pool.query( q.UPDATE_USER_BY_ID, [ firstname, lastname, email, cell, positionId, ind], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.updatejob = (ind, jobdate, route, driver) => {
    return new Promise((resolve, reject) => {
        pool.query( q.UPDATE_JOB_BY_ID, [ jobdate, route, driver, ind], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.updateroute = (ind, name) => {
    return new Promise((resolve, reject) => {
        pool.query( q.UPDATE_ROUTE_BY_ID, [ name, ind], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

//----------- DELETE
sechandDB.deletelocationByID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query( q.DELETE_LOCATION_BY_ID, id, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.deleteJobByID = (id) => {
    return new Promise((resolve, reject) => {
        pool.query( q.DELETE_JOB_BY_ID, id, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

// ----------- User Access
sechandDB.findone = (email) => {
    return new Promise((resolve, reject) => {
        pool.query( q.CHECK_ACCESS_BY_EMAIL, email, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.accessdata = (email) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ACCESS_DATA, [email], (err, results) => {
            if(err){
                return reject(err);
            }
            console.log(results)
            return resolve(results);
        });
    });
};

sechandDB.selectpassword = (email) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_PASSWORD, [email], (err, result) => {
            if(err){
                return reject(err);
            }
            console.log(result)
            return resolve(result);
        });
    });
};

sechandDB.createaccess = ( email, hashPassword, activationLink) => {
   
    return new Promise((resolve, reject) => {
        pool.query( q.CREATE_ACCESS, [email, hashPassword, activationLink], (err, results) => {
            if(err){
                //console.log("CREATE_ACCESS: reject")
                return reject(err);
            }
            //console.log("CREATE_ACCESS: resolve")
            return resolve(results);
        });
    });
};

sechandDB.findTokenById = (accessid) => {
    return new Promise((resolve, reject) => {
        pool.query( q.CHECK_TOKEN_BY_ID, [accessid], (err, results) => {
            if(err){
                console.log("findTokenById, DB token not found: " + err)
                return reject(err);
            }
            console.log("DB findToken ID from token ID: " + results)
            console.log(">>>>>>>>>>> DB findToken from token ID length: " + results.length)
            return resolve(results);
        });
    });
};

sechandDB.findToken = (token) => {
    return new Promise((resolve, reject) => {
        console.log("findToken by token: " + token)
        pool.query( q.CHECK_TOKEN, [token], (err, results) => {
            if(err){
                return reject(err);
            }
            console.log("DB findToken from token: " + results)
            return resolve(results);
        });
    });
};

sechandDB.refreshToken = (refreshtoken, accessid) => {
    return new Promise((resolve, reject) => {
        pool.query( q.REFRESH_TOKEN, [refreshtoken, accessid], (err, results) => {
            if(err){
                console.log("refreshToken: " + err)
                return reject(err);
            }
            console.log("refreshToken: " + results)
            return resolve(results);
        });
    });
};

sechandDB.createToken = ( accessid, refreshtoken) => {
    return new Promise((resolve, reject) => {
        pool.query( q.CREATE_TOKEN, [ accessid, refreshtoken], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.checkactivation = (activationlink) => {
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_ACCESS_ACTIVATION_LINK, [activationlink], (err, result) => {
            if(err){
                return reject(err);
            }
           
            //console.log("checkactivation: " + result[0].id)
            return resolve(result[0].id);
        });
    });
};

sechandDB.setactivated = (value, id) => {
    console.log("setactivated: " + id)
    return new Promise((resolve, reject) => {
        pool.query( q.ACTIVATE_ACCESS, [value, id], (err, result) => {
            if(err){
                return reject(err);
            }
            
            return resolve(result);
        });
    });
};


sechandDB.deleteToken = (token) => {
    console.log("db delete token: " + token)
    return new Promise((resolve, reject) => {
        pool.query( q.DELETE_TOKEN, [token], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.findTokenByToken = (token) => {
    console.log("db find token: " + token)
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_TOKEN, [token], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

sechandDB.driverJobsForToday = (email) => {
    console.log("db jobs for today: " + email)
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SCHEDULED_DRIVER_JOBS_TODAY, [email], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.driverJobsThisWeek = (email) => {
    console.log("db jobs this week: " + email)
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SCHEDULED_DRIVER_JOBS_THISWEEK, [email], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.driverJobsTodayFuture = (email) => {
    console.log("db jobs for today: " + email)
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_SCHEDULED_DRIVER_JOBS_TODAY_FUTURE, [email], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

sechandDB.getDriverWorklog = (email) => {
    console.log("db worklogy: " + email)
    return new Promise((resolve, reject) => {
        pool.query( q.SELECT_DRIVER_ALL_WORKLOG, [email], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


module.exports = sechandDB;