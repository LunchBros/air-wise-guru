import * as dotenv from 'dotenv'
dotenv.config()


function isLogin(req, res, next) {
    req.session.passport.user ? next() : res.status(401)
}


const authControllers = {
    isLogin: isLogin,
}

export default authControllers;