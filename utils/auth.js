const JWT = require("jsonwebtoken");
const secret = ""
//change it to actual secret

const createToken = (user) => {
    const payload = {
        _id : user._id.toString(),   //json serialization automatically converts (Can't do anything) So converted myself to avoid further confusion
        fullName : user.fullName,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role :user.role
    }
    const token = JWT.sign(payload, secret);
    return token;
}

const validateToken = (token) => {
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {createToken, validateToken};
