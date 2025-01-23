const {validateToken} = require("../utils/auth");

const checkForAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try{
            console.log("Assigned JWT token is ",tokenCookieValue);
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            return next();
        }
        catch(error) {
            console.log("Fault in Authentication.js");
            console.error(error);
            return next();
        }
    }
}

module.exports  = checkForAuthenticationCookie;