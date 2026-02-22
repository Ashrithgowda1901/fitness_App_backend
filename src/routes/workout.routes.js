const express=require("express");

const router=express.Router();
const {getWorkout,addWorkout}=require("../controller/workout.controller")

router.get("/",getWorkout);
router.post("/",addWorkout);

module.exports=router;