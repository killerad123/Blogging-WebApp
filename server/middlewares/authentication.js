const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

function checkUserAuthentication(req, res, next) {
    console.log("auth")
    if (req.cookies?.token) {
        let data = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        console.log(data)
        req.user = data
        next()
    }
    else {
        // res.redirect("/user")
        res.json({
            message: "Unauthenticated User",
            success:false
        })
    }
}


module.exports = checkUserAuthentication;

/* 
?.: This is the optional chaining operator. It checks if the object on its left side (req.cookies in this case) is null or undefined. If it is, the expression returns undefined immediately, without trying to access the token property. This prevents errors that would occur if you tried to access a property of null or undefined.

*/