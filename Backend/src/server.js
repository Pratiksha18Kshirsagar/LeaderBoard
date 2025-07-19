import express from "express";
import "dotenv/config.js"
import { db } from "./lib/db.js";
import userRoute from "./routes/userRoutes.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;

//database setup
db();

//frontend connection
app.use(cors({origin:"http://localhost:5173" ,credentials: true  }));

//parse the url encoded data
app.use(express.json())

//user routes
app.use("/" , userRoute );


//server start
app.listen(PORT , () =>{
console.log(`App is listening on port ${PORT}`);
})