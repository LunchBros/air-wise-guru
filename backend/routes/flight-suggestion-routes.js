import suggestionControllers
 from "../controllers/flight-suggestion-controllers.js"
import authControllers from "../controllers/auth-controllers.js"
import express from "express"


const router = express.Router()

router.get("/search/:departure/:destination/:depatureTime/:tier/:option", (req, res) => suggestionControllers.RequestionSuggestion(req, res))

router.get("/", authControllers.isLogin,  (req, res) => suggestionControllers.GetSuggestions(req, res))

router.delete("/:id",  authControllers.isLogin, (req, res) => suggestionControllers.RemoveSuggestion(req, res))

export default router