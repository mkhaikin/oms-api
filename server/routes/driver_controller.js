const ApiError = require('../exeptions/api-error')
const db = require('../db');

module.exports = {
    todayjobs: async function(req, res, next){
        try {
            let email = req.user.email;

            let userData = await db.jobsForToday( email);
            if(typeof userData !== 'undefined'){
                return res.json(userData)
            }
            else throw ApiError.BadRequest('User with e-mail address ${email} does not exists or DB error')

        } catch (e) {
            next(e)
        }
    }
}