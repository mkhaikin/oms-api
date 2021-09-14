//const { findone } = require('../db');
const db = require('../db');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../exeptions/api-error')

async function findOne(email){
    /* */
    try{
       
        console.log("access-service FindOne")
        const candidate = await db.findone(email);
        console.log("access-service FindOne candidate: " + candidate)
        if(candidate){
           
            //console.log("User with e-mail address ${email} already exists")
            return true
        }

        return false
    }catch(e){
        console.log(e);
        throw new Error(`Communication error while email checking`)
    }   
}

async function getBadge(email){
            try{
                //console.log("getBadge email: " + email);
                const results = await db.accessdata(email);
                //console.log("getBadge results: " + results);
                const _id = results[0].id
                const _activated = results[0].activated
                const _positionid = results[0].positionid
                //console.log("getBadge: " + _id + " " + _activated);
                badge = {_id, _activated, _positionid}
                return badge
                
                //return results[0]
            }catch(e){
                console.log(e);
                throw new Error(`Communication error while trying to get access badge`)
            }
        }

async function removeToken(refreshToken){
            try {
                const token = await db.removeToken(refreshToken)
                return token;
            } catch (e) {
                console.log(e);
                throw new Error(`Communication error while trying to delete refresh token`)
            }
        }

module.exports = {
    
     registrationService: async function ( email, password)  {
         /**/
                try{
                     const answ = await findOne(email)
                     console.log("registrationService answ: " + answ)
                    if(!answ){
                        const hashPassword = await bcrypt.hash(password, 3)
                        const activationLink = uuid.v4()
                        let results = await db.createaccess(email, hashPassword, activationLink);
                        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
                        const userbadge = await getBadge(email)
                        
                        const badge = {email, ...{userbadge}}
                        const tokens = await tokenService.generateTokens({...badge})
                        console.log("--------------------registrationService tokens: " + tokens.refreshToken)
                        await tokenService.saveToken(userbadge._id, tokens.refreshToken)  
                        await tokenService.validateRefreshToken(tokens.refreshToken)
                                               
                        return {...tokens, user: badge}
                    }
                    else{
                        //console.log("Error in registration tranzaction");
                        throw ApiError.BadRequest(`User with e-mail address ${email} already exists`)
                    }
                } catch(e){
                    console.log(e);
                    throw ApiError.BadRequest(e)
                } 
                /**/
            },  
    loginService: async function ( email, password)  {
                const userpassword = await db.selectpassword(email)
                console.log('DB password: ' + userpassword[0].password)
                if(!userpassword[0].password)
                    throw  ApiError.BadRequest(`User with such e-mail address ${email} was not found.`)

                const isPassEquals = bcrypt.compare(password, userpassword[0].password)
                console.log('Password compare, isPassEquals: ' + isPassEquals)
                if(!isPassEquals){
                    throw ApiError.BadRequest('Password is not correct.')
                }

                const userbadge = await getBadge(email)
                                
                const badge = {email, ...{userbadge}}
                const tokens = await tokenService.generateTokens({...badge})
                console.log("---------------------registrationService tokens login : " + tokens.refreshToken)
                await tokenService.saveToken(userbadge._id, tokens.refreshToken)                        
                
                return {...tokens, user: badge}

        },
    logoutService: async function ( userid, refreshToken)  {

       /* console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log("access service, userid: " + userid)
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~") */ 
        try{
                const token = await tokenService.removeToken(userid, refreshToken)
                return token
        }catch(e){
            throw ApiError.BadRequest('Logout service error')
        }
    }, 
    refreshService: async function ( refreshToken)  {
        console.log("refreshService, refreshToken: " + refreshToken)
        if(typeof refreshToken === 'undefine' && !refreshToken)
            throw ApiError.UnautorizedError()
            
    console.log("refreshService 1, refreshToken: " + refreshToken)
        try {
            const userData = await tokenService.validateRefreshToken(refreshToken)
            const tokenFromDb = await tokenService.findTokenByToken(refreshToken)
    console.log("refreshService : 2")
    console.log("refreshService : 2 userData: " + JSON.stringify(userData))
    console.log("refreshService : 2 tokenFromDb: " + tokenFromDb)
            if(!userData || !tokenFromDb){
                throw ApiError.UnautorizedError()
            }
    console.log("refreshService : 3")
            const email =    userData.email
            const userbadge = await getBadge(email)                                
            const badge = {email, ...{userbadge}}
            const tokens = await tokenService.generateTokens({...badge})
            console.log("--------------registrationService.refreshService tokens: " + tokens.refreshToken)
            await tokenService.saveToken(userbadge._id, tokens.refreshToken)                        
    console.log("refreshService : 4")       
            return {...tokens, user: badge}
        } catch (e) {
            throw ApiError.UnautorizedError()
        }
    },        
}