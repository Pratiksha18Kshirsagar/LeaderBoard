import express from "express";
import { addUser  , getAllusers , claimPoints , getLeaderboard , getUser , deleteAllUsers} from "../controllers/userControllers.js";
const router = express.Router();


router.get("/users" , getAllusers);
router.post("/adduser" , addUser);
router.post("/claim-points" , claimPoints);
router.get("/leaderboard" , getLeaderboard);
router.post("/user" , getUser);
router.delete("/deleteAllUsers" , deleteAllUsers );



export default router;

