//const { findone } = require('../db');
const db = require('../db');
//const bcrypt = require('bcrypt')
//const uuid = require('uuid')
//const mailService = require('../service/mail-service');
//const tokenService = require('../service/token-service');
const {registrationService, loginService, logoutService, refreshService}  = require('../service/access-service');
const ApiError = require('../exeptions/api-error')
const {body, validationResult} = require('express-validator');
const { json } = require('express');

module.exports = {

    registration: async function(req, res, next){
                try {
                    console.log('Backend------------------------------------')
                    console.log('access controller registration: ' + req.body.email)
                    console.log('access controller registration: ' + req.body.password)
                    //body('emai').isEmail
                    //body('password').isLength({min:3, max: 32})

                    await body('email', 'Not correct email, Email length should be 10 to 30 characters and include @').isEmail().isLength({ min: 10, max: 30 }).run(req);
                    await body('password', 'Password length should be 3 to 32 characters').isLength({min:3, max: 32}).run(req);

                    const errors = validationResult(req)
                    if(!errors.isEmpty()){
                        return next(ApiError.BadRequest('Validation error', errors.array()))
                    }
                    const {email, password} = req.body
                    const userData = await registrationService(email, password)
                    if(typeof userData !== 'undefined'){
                        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
                        return res.json(userData)
                    }
                    else throw ApiError.BadRequest('User with e-mail address ${email} already exists or internal server error')

                } catch (e) {
                    next(e)
                }
        
            },            
    login: async function (req, res, next)  {
                try{
                    const {email, password} = req.body
                    console.log("access_controller login, body: " + req.body.email + " " + req.body.password)
                    console.log("access_controller login, email: " + email + ", password: " + password)

                  /*   const userData = await loginService(email, password);
                   
                    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
                    return res.json(userData) */
                    loginService(email, password).then(userData =>{
                        console.log("userData.user.email : " + userData.user.email)

                   


                        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true,
                            sameSite: "none", secure:true, })
                        console.log("loginService, userData: " + JSON.stringify(userData))
                        return res.json(userData)
                    })
                   
                } catch(e){
                    console.log("access_controller, Error in login-> " + e);
                    next(e)
                    //res.sendStatus(500);
                }
            },
    logout: async function (req, res, next)  {
                try{
                    const {refreshToken} = req.cookies;
                    const userid = req.body._id
                    /* console.log("access controller----------------------------------------------")
                    console.log("access controller, logout iserid: " + JSON.stringify(  req.body))
                    console.log("access controller, logout iserid: " + JSON.stringify(  req.body._id))
                    console.log("access controller----------------------------------------------")
 */
                    const token = await logoutService(userid, refreshToken)
                    res.clearCookie('refreshToken')
                    return res.json(token)
                } catch(e){
                    console.log(e);
                    next(e)
                    //res.sendStatus(500);
                }
            }, 
    activate: async function (req, res, next)  {
        const activationlink = req.params.link
                try{
                    let id = await db.checkactivation(activationlink);
                    console.log("checkactivation result: " + id);

                    if(!id){
                        throw ApiError.BadRequest('Incorrect activation link')
                    }
                    await db.setactivated(1, id)
//negative logic code!
                    //console.log("activationresult: " + activationresult)
                    res.redirect(process.env.CLIENT_URL)
                } catch(e){
                    console.log(e);
                    next(e)
                    //res.sendStatus(500);
                }
            },
    refresh: async function (req, res, next)  {
                try{
                    //console.log("req.cookie:" + req.cookies.refreshToken)
                    //console.log("req.signedCookies.refreshToken:" + req.signedCookies.refreshToken)
                    //const {refreshToken} = req.cookies.refreshToken;
                    const refreshToken = req.cookies[ 'refreshToken'];
console.log("access_controller refresh, refreshToken: " + refreshToken)                    
                    const userData = await refreshService(refreshToken);                   
                    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:true})
                    return res.json(userData)
                } catch(e){
                    console.log("refresh error:" + e);
                    next(e)
                    
                }
            },
    access: async function (req, res, next)  {
                try{
                    let results = await db.access();
                    res.json(results);
                } catch(e){
                    console.log(e);
                    next(e)
                   // res.sendStatus(500);
                }
            },
            
}