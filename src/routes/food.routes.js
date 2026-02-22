const express=require("express");

const router=express.Router();

const {getAllFoods,addFood}=require("../controller/food.controller")

router.get("/",getAllFoods);
router.post("/",addFood);

module.exports=router;