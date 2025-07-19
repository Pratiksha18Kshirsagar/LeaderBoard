import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = schema({
    name:{
        type:String,
        required:true,
    },
    totalpoints:{
        type:Number,
        default:0
    }
})





const User = mongoose.model("User" , userSchema);

export default User;