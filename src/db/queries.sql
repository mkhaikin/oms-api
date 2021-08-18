query = {

    SELECT_ALL_USERS : `SELECT * FROM users`,
    SELECT_ALL_USERS_ID_NAME : `SELECT ind, CONCAT (ind, '-', firstname, ' ', lastname) as idname FROM users WHERE positionId = 3`, //3 - drivers
    SELECT_USER_BY_ID : `SELECT * FROM users WHERE ind = ?`,
    SELECT_USER_BY_POSITION_ID: `SELECT * FROM users WHERE positionId = ?`,
    SELECT_USER_BY_LAST_NAME: `SELECT * FROM users WHERE lastname = ?`,
    SELECT_USER_BY_FULL_NAME: `SELECT * FROM users WHERE firstname=? AND lastname = ?`,
    SELECT_ALL_LOCATIONS: `SELECT * FROM locations`,
    SELECT_LOCATION_BY_ID: `SELECT * FROM locations WHERE ind = ?`,
    SELECT_LOCATIONS_ROUTE_ID: `SELECT * FROM locations WHERE routeId = ?`,
    SELECT_LOCATIONS_BY_ROUTE_NAME_ID: `SELECT l.ind, area, street_avenue,w_e, number, notice 
                                        FROM locations l
                                        JOIN routes r
                                        ON r.ind = l.routeId
                                        WHERE r.ind = ?`,
    SELECT_LOCATIONS_BY_AREA: `SELECT * FROM locations WHERE area = ?`,
    SELECT_ALL_POSITIONS : `SELECT * FROM positions`,
    SELECT_ALL_ROUTES: `SELECT * FROM routes`,
    SELECT__ROUTE: `SELECT name FROM routes WHERE ind=?`,
    SELECT_SCHEDULED_JOBS_TODAY_FUTURE: `SELECT d1.ind as ind, 
                                                DATE_FORMAT(d1.date, '%Y-%m-%d') as scheduled, 
                                                concat(d1.routeId, '-', r.name) as route, 
                                                concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                        FROM dayjoblist d1
	                                    JOIN routes as r 
		                                ON   d1.routeId = r.ind
	                                    JOIN users u
		                                ON   d1.driverId = u.ind
                                        WHERE STR_TO_DATE(d1.date, '%Y-%m-%d' ) >=  DATE(CURDATE()) `,
    SELECT_SCHEDULED_JOBS_THISWEEK: `SELECT d1.ind as ind, 
                                                DATE_FORMAT(d1.date, '%Y-%m-%d') as scheduled, 
                                                concat(d1.routeId, '-', r.name) as route, 
                                                concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                        FROM dayjoblist d1
	                                    JOIN routes as r 
		                                ON   d1.routeId = r.ind
	                                    JOIN users u
		                                ON   d1.driverId = u.ind
                                        WHERE WEEK(STR_TO_DATE(d1.date, '%Y-%m-%d' )) =  WEEK(DATE(CURDATE())) `,                                        
    SELECT_ALL_WORKLOG: `SELECT w.ind as ind, 
                                DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                w.bag,
                                concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                            FROM worklog as w
                            JOIN locations as l
                            ON w.locationId = l.ind
                            JOIN users as u
                            ON w.driverId = u.ind`,
    SELECT_WEEK_WORKLOG: `SELECT w.ind as ind, 
                                DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                w.bag,
                                concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                            FROM worklog as w
                            JOIN locations as l
                            ON w.locationId = l.ind
                            JOIN users as u
                            ON w.driverId = u.ind
                            WHERE WEEK(STR_TO_DATE(w.date, '%Y-%m-%d' )) =  WEEK(DATE(CURDATE()))`,                            
    SELECT_LOCATION_WORKLOG: `SELECT w.ind as ind, 
                                    DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                    w.bag,
                                    concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                    concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                FROM worklog as w
                                JOIN locations as l
                                ON w.locationId = l.ind
                                JOIN users as u
                                ON w.driverId = u.ind
                                WHERE w.locationId = ?`, 
    SELECT_YEAR_MONTH_WORKLOG: `SELECT w.ind as ind, 
                                    DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                    w.bag,
                                    concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                    concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                FROM worklog as w
                                JOIN locations as l
                                ON w.locationId = l.ind
                                JOIN users as u
                                ON w.driverId = u.ind
                               WHERE year(doneon) = ?
                                AND month(doneon) = ?`,           //? - 1-12                  
    SELECT_YEAR_WORKLOG: `SELECT w.ind as ind, 
                                    DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                    w.bag,
                                    concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                    concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                FROM worklog as w
                                JOIN locations as l
                                ON w.locationId = l.ind
                                JOIN users as u
                                ON w.driverId = u.ind
                               WHERE year(doneon) = ?`,       //? - 2021
    SELECT_LOCATION_MONTH_WORKLOG: `SELECT w.ind as ind, 
                                    DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                    w.bag,
                                    concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                    concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                FROM worklog as w
                                JOIN locations as l
                                ON w.locationId = l.ind
                                JOIN users as u
                                ON w.driverId = u.ind
                                WHERE year(date) = ?            //?-2021
                                AND   month(date)= ?            //?-6
                                AND w.locationId = ?`,          //?-1  
    SELECT_SUM_GROUPBY_WORKLOG: `SELECT w.ind as ind,
                                    year(w.date) as year,
                                    month(w.date) as month,
                                    SUM(w.bag) as total,
                                    concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location
                                FROM worklog as w
                                JOIN locations as l
                                ON w.locationId = l.ind
                                GROUP BY 
                                    year, month, l.ind`,  

    SELECT_SUM_YEARLOCATION_WORKLOG: `SELECT w.ind as ind,                                     
                                   SUM( w.bag) as total,
                                    concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location
                                FROM worklog as w
                                JOIN locations as l
                                ON w.locationId = l.ind
                                WHERE year(w.date) = ? 
                                AND w.locationId = ?
                                GROUP BY w.locationId`,                                                 
    INSERT_NEW_USER: `INSERT INTO users (firstname, lastname, email, cell, positionId) VALUES(?,?,?,?,?)`,
    INSERT_NEW_JOB: `INSERT INTO dayjoblist( routeId, driverId, date) VALUES ( ?, ?, ?)`,
    INSERT_NEW_LOCATION: `INSERT INTO locations (routeId, area, street_avenue, w_e, number, notice) VALUES(?,?,?,?,?,?)`,
    INSERT_NEW_ROUTE: `INSERT INTO routes (name) VALUES(?)`,
    INSERT_WORKLOG: `INSERT INTO worklog ( date, locationId, bag, driverId) VALUES(?,?,?,?)`,        
    DELETE_ROUTE_BY_ID: `DELETE FROM routes WHERE ind = ?`,
    DELETE_LOCATION_BY_ID: `DELETE FROM locations WHERE ind = ?`,
    DELETE_JOB_BY_ID: `DELETE FROM dayjoblist WHERE ind = ?`,
    UPDATE_LOCATION_BY_ID: `UPDATE locations SET routeId=?, area=?,street_avenue=?, w_e=?, number=?, notice=? WHERE ind=?`,
    UPDATE_USER_BY_ID: `UPDATE users SET firstname=?, lastname=?, email=?, cell=?, positionId=? WHERE ind=?`,
    UPDATE_JOB_BY_ID: `UPDATE dayjoblist SET date=?, routeId=?, driverId=? WHERE ind=?`,
    UPDATE_ROUTE_BY_ID: `UPDATE routes SET name=? WHERE ind=?`,

    CHECK_ACCESS_BY_EMAIL: `SELECT id FROM access WHERE email = ?`,
    CREATE_ACCESS: `INSERT INTO access (email, password, activationlink) VALUES (?,?,?)`,
    //CHECK_TOKEN_BY_ID: `SELECT ( SELECT id FROM token WHERE accessid=?) as id FROM dual`,
    CHECK_TOKEN_BY_ID: `SELECT refreshtoken FROM token WHERE accessid=?`,
    CHECK_TOKEN: `SELECT refreshtoken FROM token WHERE refreshtoken=?`,
    REFRESH_TOKEN: `UPDATE token SET refreshtoken=? WHERE accessid=?`,
    CREATE_TOKEN: `INSERT INTO token (accessid, refreshtoken) VALUES(?,?)`,
    SELECT_ACCESS_DATA: `SELECT a.id, a.activated, u.positionid 
                            FROM access a
                            JOIN users u
                            ON a.email = u.email
                            WHERE a.email = ?`,
    SELECT_ACCESS_ACTIVATION_LINK: `SELECT id FROM access WHERE activationlink = ?`,
    ACTIVATE_ACCESS: 'UPDATE access SET activated=? WHERE id=?',
    SELECT_PASSWORD: `SELECT password FROM access WHERE email = ?`,
    DELETE_TOKEN: `UPDATE token SET refreshtoken=null WHERE refreshtoken=?`,
    SELECT_TOKEN: `SELECT accessid, refreshtoken FROM token WHERE refreshtoken=?`,

    SELECT_SCHEDULED_DRIVER_JOBS_TODAY_FUTURE: `SELECT d1.ind as ind, 
                                                DATE_FORMAT(d1.date, '%Y-%m-%d') as scheduled, 
                                                concat(d1.routeId, '-', r.name) as route, 
                                                concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver  
                                        FROM dayjoblist d1
	                                    JOIN routes as r 
		                                ON   d1.routeId = r.ind
	                                    JOIN users u
		                                ON   d1.driverId = u.ind
                                        WHERE STR_TO_DATE(d1.date, '%Y-%m-%d' ) >=  DATE(CURDATE()) 
                                        AND u.email=?`,
    SELECT_SCHEDULED_DRIVER_JOBS_TODAY: `SELECT d1.ind as ind, 
                                                DATE_FORMAT(d1.date, '%Y-%m-%d') as scheduled, 
                                                concat(d1.routeId, '-', r.name) as route, 
                                                concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver,
                                                l.area, l.street_avenue, l.w_e, l.number, l.ind as locationid
                                        FROM dayjoblist d1 
	                                    JOIN routes as r 
		                                ON   d1.routeId = r.ind
	                                    JOIN users u
		                                ON   d1.driverId = u.ind
                                        JOIN locations l
                                        ON r.ind = l.routeId
                                        WHERE STR_TO_DATE(d1.date, '%Y-%m-%d' ) =  DATE(CURDATE()) 
                                        AND u.email= ?`,  
    INSERT_UPDATE_WORKLOG_TODAY: `INSERT INTO worklog (date, locationId, bag, driverId)
                                                VALUES (?, ?, ?, ?)
                                                ON DUPLICATE KEY UPDATE
                                                bag     = VALUES(bag)`,
    SELECT_SCHEDULED_DRIVER_JOBS_THISWEEK: `SELECT d1.ind as ind, 
                                                DATE_FORMAT(d1.date, '%Y-%m-%d') as scheduled, 
                                                concat(d1.routeId, '-', r.name) as route, 
                                                concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                        FROM dayjoblist d1
	                                    JOIN routes as r 
		                                ON   d1.routeId = r.ind
	                                    JOIN users u
		                                ON   d1.driverId = u.ind
                                        WHERE WEEK(STR_TO_DATE(d1.date, '%Y-%m-%d' )) =  WEEK(DATE(CURDATE()))
                                        AND u.email= ? `, 
    SELECT_DRIVER_ALL_WORKLOG: `SELECT w.ind as ind, 
                                                DATE_FORMAT(w.date, '%Y-%m-%d') as doneon, 
                                                w.bag,
                                                concat(l.ind, ': ', l.number ,' ', l.street_avenue, ' ', COALESCE(l.w_e, ''), ', ', l.area) as location,
                                                concat(u.ind, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
                                            FROM worklog as w
                                            JOIN locations as l
                                            ON w.locationId = l.ind
                                            JOIN users as u
                                            ON w.driverId = u.ind
                                            AND u.email= ?`,                                        
}


module.exports = query;
//ALTER TABLE worklog ADD UNIQUE (date, locationId, driverId)


/*
SELECT curdate() as Today, 
	CONCAT(`firstname`, " ", `lastname`) as Driver,
	CONCAT( `area`, ',', `number`, " ", `street_avenue`, " ", IFNULL(`w_e`, '') ) AS Locations  
FROM `locations`, `users` 
WHERE routeId=1 AND ind = 4
*/
////////////////////////////
/* 
today
SELECT d1.ind as id, d1.date as scheduled, concat(d1.routeId, '-', r.name) as route, concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
from dayjoblist d1
	join routes as r 
		on d1.routeId = r.ind
	join users u
		on d1.driverId = u.ind
where STR_TO_DATE(d1.date, '%Y-%m-%d' ) =  DATE(CURDATE()) 

today + future
SELECT d1.ind as id, d1.date as scheduled, concat(d1.routeId, '-', r.name) as route, concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
from dayjoblist d1
	join routes as r 
		on d1.routeId = r.ind
	join users u
		on d1.driverId = u.ind
where STR_TO_DATE(d1.date, '%Y-%m-%d' ) >=  DATE(CURDATE()) 

future
SELECT d1.ind as id, d1.date as scheduled, concat(d1.routeId, '-', r.name) as route, concat(d1.driverId, '-', u.firstname, ' ', u.lastname, ', ', u.cell) as driver
from dayjoblist d1
	join routes as r 
		on d1.routeId = r.ind
	join users u
		on d1.driverId = u.ind
where STR_TO_DATE(d1.date, '%Y-%m-%d' ) >  DATE(CURDATE()) 
*/