import mongoose from "mongoose";
import "dotenv/config.js"



export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connected!!")
    } catch (error) {
        console.log(error);
    }
}

