import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import  "express-async-errors";
import connectDatabase from "./db.js";
import authRoutes from "./routes/auth-routes.js"
import suggestionRoutes from "./routes/flight-suggestion-routes.js"
import * as dotenv from 'dotenv'
import passport from "passport"
import session from "express-session"
import mongoose from "mongoose"
import MongoStore from "connect-mongo";
dotenv.config()

const HOST= process.env.HOST
const PORT = process.env.PORT
const app = express();

connectDatabase();

const isDebug = true  // set to false once deploy

const cookieConfigs = {
  secure: !isDebug,
  httpOnly: !isDebug,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24  
}

const sessionConfigs = {
    name: "session",
    secret: process.env.SECRET_AO, 
    resave: false, 
    saveUninitialized: true,
    cookie: cookieConfigs,    // Set to true in production
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      dbName: process.env.MONGO_NAME,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native"
})
}

app
  .use(cors())
  .use(cookieParser(process.env.SECRET_AO))
  .use(express.urlencoded({ extended: true }))
  .use(session(sessionConfigs))
  .use(passport.initialize())
  .use(passport.session())

// Load routes
app.use("/auth", authRoutes)
app.use("/suggestion", suggestionRoutes )

// Global error handling
// app.use((err, _req, res, next) => {
//   res.status(500).send("Internal server error!");
// });

// Test UI // remove when all implemented
// let homepage = `<h2>Initiated server</h2><a href="/auth/google">Login with google</a>`
let homepage = `<h2>Initiated server</h2>`

app.get("/", (req, res) => {  
  res.send(homepage);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN_DEV);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
  next();
  });

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
