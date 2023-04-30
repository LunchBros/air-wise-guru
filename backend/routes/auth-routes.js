import express from "express"
import passport from "../middleware/passport-google.js"
import authControllers  from "../controllers/auth-controllers.js"

const router = express.Router()

router.get("/google",  passport.authenticate("google"))

router.get("/google/callback", passport.authenticate( "google", {
    // successRedirect: `${process.env.FRONTEND_ORIGIN}/protected`,
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure"
}
))

router.get("/protected", authControllers.isLogin, (req, res) => {
    res.send("Still log in")
})

router.get("/logout", authControllers.isLogin,  (req, res) => {
    req.session.destroy()
    req.logout()
    // res.send(`${process.env.FRONTEND_ORIGIN}/logout`)
    res.redirect("/auth/logout")
})

router.get("/google/failure", (req, res) => {
    res.send("Failed to authenticated ...")
})

export default router;