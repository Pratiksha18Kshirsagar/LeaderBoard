import mongoose from "mongoose";
const schema = mongoose.Schema;

const claimHistory = schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: "User",
    },
    pointsClaimed: {
        type: Number,
    }
}, { timestamps: true })

const Claimhistory = mongoose.model("Claimhistory" , claimHistory);

export default Claimhistory;