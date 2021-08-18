const ApiError = require('../exeptions/api-error')
const tokenService = require('../service/token-service')

module.exports = async function(req, res, next){
    try {
        const authorizationHeader = req.headers.authorization
    console.log("auth-middle, authorizationHeader: " + JSON.stringify(authorizationHeader))
        if(!authorizationHeader)
            return next(ApiError.UnautorizedError())

        const accessToken = authorizationHeader.split(' ')[1]
    console.log("auth-middle, accessToken: " + accessToken)
        if(!accessToken)
            return next(ApiError.UnautorizedError())

        const userData = await tokenService.validateAccessToken(accessToken)
        if(!userData)
            return next(ApiError.UnautorizedError())

        req.user = userData
        console.log("auth-middle userData: " + userData.email)
        next()
    } catch (e) {
        return next(ApiError.UnautorizedError())
    }
}