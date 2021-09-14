const jwt = require('jsonwebtoken')
const db = require('../db');
//const { findToken, refreshUserToken, createToken } = require('./access-service');

 async function findTokenById(accessid){
    try{
        console.log("In token table findToken search for: " + accessid)
       const tokendata = await db.findTokenById(accessid);
        console.log("In token table tokendata: " + tokendata.length)

        return tokendata 
      /*   db.findTokenById(accessid).then(tokendata => {
            console.log("In token table tokendata: " + tokendata.length)
            return tokendata
        }) */
    }catch(e){
        console.log(e);
        throw new Error(`Communication error while token checking`)
    }
}

async function refreshUserToken(refreshToken, accessid ){
    try{
        /*
        const results = await db.refreshToken(refreshToken, accessid);
        //const results = db.refreshToken(refreshToken, accessid);
        
        return results
*/
        return await db.refreshToken(refreshToken, accessid);
    }catch(e){
        console.log(e);
        throw new Error(`Communication error while token refreshing`)
    }
    
}

async function createToken( accessid, refreshToken ){
    try{
        const results = await db.createToken(accessid, refreshToken);
        
        return results
    }catch(e){
        console.log(e);
        throw new Error(`Communication error while token refreshing`)
    }
}

module.exports = {
    async generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return{
            accessToken,
            refreshToken
        }
    },
    async saveToken(accessid, refreshToken){
        console.log("-----saveToken(accessid, refreshToken) input: " + accessid + " " + refreshToken)
        try{
            findTokenById(accessid).then((tokendata) => {
                console.log("=================findtokenbyid result: " + tokendata.length)
                if( tokendata.length !== 0){
              
                    console.log("Refresh Token now: "  + accessid + " refreshToken: " + refreshToken)
                    refreshUserToken(refreshToken, accessid).then((results) =>{
                        console.log("saveToken result from refreshUserToken: " + results)
                        return results
                    })
                    
                }
                else{
                    console.log("Create and Save new Token now, accessid: " + accessid + " refreshToken: " + refreshToken)
                    createToken( accessid, refreshToken).then(results=> {return results})
                    
                }
            })



/*
            let tokendata = null           
            tokendata = findTokenById(accessid)
            console.log("------------saveToken(accessid, refreshToken) tokendata: " + JSON.stringify(tokendata))
             
            //if(tokendata !== null && typeof tokendata[0].id !== 'undefined' && tokendata[0].id !== null){
            if( tokendata !== null){
              
                console.log("Refresh Token now: "  + accessid + " refreshToken: " + refreshToken)
                const results = await refreshUserToken(refreshToken, accessid)
                console.log("saveToken result from refreshUserToken: " + results)
                return results
            }
            else{
                console.log("Create and Save new Token now, accessid: " + accessid + " refreshToken: " + refreshToken)
                const results = await createToken( accessid, refreshToken)
                return results
            }
*/

        }catch(e){
            console.log(e);
            throw new Error(`Communication error while save token`)
        }
    },
    async removeToken(userid, refreshToken){
        console.log("remove token, userid: " + userid + ", refreshToken: " + refreshToken)
        try{
            if(typeof userid !== 'undefined' && userid !== null){
                console.log("userid ")
                const result = await refreshUserToken(null, userid )
                return result
            }else{
                console.log("userid undefined, token: " + refreshToken)
                const result = await db.deleteToken(refreshToken)
                return result
            }
        }catch(e){
            throw new Error(`Communication error while remove refresh token`)
        }
    },

    async validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            /////////////////////////////////////////////////////////////
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            console.log("token service, validateAccessToken: " + JSON.stringify(userData))
            console.log("token service, validateAccessToken: " + userData.email)
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            //////////////////////////////////////////////////////////////
            return userData
        } catch (e) {
            return null
        }
    },
    async validateRefreshToken(token){
        console.log("validateRefreshToken, JWT_REFRESH_SECRET: " + process.env.JWT_REFRESH_SECRET)
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            console.log("validateRefreshToken: " + userData.email)
            return userData
        } catch (e) {
            console.log("validateRefreshToken -> error:" + e)
            return null
        }
    },
    async findTokenByToken(refreshToken){
        console.log("findTokenByToken: " + refreshToken)
        try {
            const token = await db.findToken(refreshToken)
            return token
        } catch (e) {
            return null
        }
    }
}