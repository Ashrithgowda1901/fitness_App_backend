const Workout=require("../models/Workout.model");

const getWorkout=async(req,res)=>{
    const {date}=req.query;

    if(!date)
    {
        return res.status(400).json({
            message:"date is required field"
        })
    }
    try
    {
        const workouts=await Workout.find({user: req.user.id,date:date}).sort({ createdAt: 1 });
        return res.status(200).json(workouts)
    } 
    catch(err)
    {
        return res.status(500).json({
            message:err.message
        })
    }
}

const addWorkout=async(req,res)=>{

    const {date,exerciseName,sets,reps,weight}=req.body;

    if(!date || !exerciseName || sets==null || reps==null)
    {
        return res.status(400).json({
            message:"date,exerciseName,sets,reps are required field"
        })
    }
    try
    {
        const workout=new  Workout ({
            user: req.user.id, 
            date,
            exerciseName,
            sets,
            reps,
            weight:weight?weight:null
        })

        const savedWorkout=await workout.save();
        res.status(201).json ({
            savedWorkout
        })
    }
    catch(err)
    {
        if (err.name === "ValidationError") {
            return res.status(400).json({
              message: err.message     
            });
          }
          return res.status(500).json({
            message: err.message
          });
    }

}
module.exports={
    getWorkout,
    addWorkout
}