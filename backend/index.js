import express from "express";
import cors from "cors";
import "express-async-errors";
import connectDatabase from "./db.js";
import * as dotenv from 'dotenv'
dotenv.config()

const HOST= process.env.HOST
const PORT = process.env.PORT
const app = express();

connectDatabase();

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

// Load routes

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Internal server error!");
});

app.get("/", (req, res) => {  
  res.send("Initiated server");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
