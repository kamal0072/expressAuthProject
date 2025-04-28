import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import web from "./Routes/web.js";

const app = express();

//config env data/parameters
dotenv.config();
const PORT = process.env.PORT
const LOCALHOST = process.env.LOCALHOST

// //Calling DATABASE connection string for MongoDB
const DATABASE_URI = process.env.DATABASE_URI
connectDB(DATABASE_URI);
//middleware for templates rendering
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//base routing for all controllers
app.use("/user", web);

//setting ejs engine
app.set("view engine", "ejs");
// app.set("views", "./views");



//listening on port
app.listen(PORT, () => {
    console.log(`Server is running on port http://${LOCALHOST}:${PORT}`);
});