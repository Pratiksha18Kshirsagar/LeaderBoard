import Claimhistory from "../models/ClaimHistory.js";
import User from "../models/User.js";

export const addUser = async (req, res) => {
    let { name } = req.body;
    console.log(req.body)
    const userName = name.charAt(0).toUpperCase() + name.slice(1);
    try {
        if (!name) {
            return res.status(400).json({ message: "Please enter your name!!" });
        }
        const newUser = await User.create({ name: userName });
        return res.status(200).json({ message: "UserAdded Successfully", user: newUser });
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong!" });
    }

}


export const getAllusers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);

    } catch (error) {
        return res.status(400).json({ message: "Error in getting users!" })
    }

}


export const claimPoints = async (req, res) => {
    let { id } = req.body;
    console.log(req.body);
    try {
        if (!id) {
            return res.status(400).json({ message: "Id is not available!" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "user is not available!" });
        }
        let generatepoints = Math.floor(Math.random() * 10) + 1;
        user.totalpoints += generatepoints;
        await user.save();
        const pointshistory = Claimhistory.create({ userId: user._id, pointsclaimed: generatepoints });
        return res.status(200).json({ pointsclaimed: generatepoints });
    } catch (error) {
        return res.status(400).json({ message: "error occured in claiming points!" });
    }
}


export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find().sort({ totalpoints: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ message: "Error occured while getting leader board!!" })
    }
}


export const getUser = async (req, res) => {
 let{id} = req.body;
 const user = await User.findById(id);
 return res.status(200).json(user);
}


export const deleteAllUsers = async (req,res)=>{
    const users = await User.deleteMany();
    
}