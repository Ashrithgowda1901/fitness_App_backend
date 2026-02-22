const express=require("express");

const router=express.Router();

const {getNutrition,addNutrition}=require("../controller/nutritionLog.controller");

router.get("/",getNutrition);
router.post("/",addNutrition)

module.exports=router;