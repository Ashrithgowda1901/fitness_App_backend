const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const authMiddleware=require("./middlewares/auth.middleware")
const app=express();

app.use(cookieParser())
app.use(express.json());
app.use(
    cors({
     origin: true,
      credentials: true,
    })
  );

const authRoutes=require("./routes/auth.routes");
const foodRoutes=require("./routes/food.routes");
const weightRoutes=require("./routes/weight.routes");
const workouts=require("./routes/workout.routes");
const nutritionLogs=require("./routes/nutritionLog.routes");

app.use("/api/auth",authRoutes)
app.use("/api/foods",authMiddleware,foodRoutes);
app.use("/api/weights",authMiddleware,weightRoutes);
app.use("/api/workouts",authMiddleware,workouts);
app.use("/api/nutritionLogs",authMiddleware,nutritionLogs);
 

module.exports=app;