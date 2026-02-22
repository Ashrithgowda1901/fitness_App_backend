const express=require("express");
const router=express.Router();

const {getWeight,addOrUpdateWeight}=require("../controller/weight.controller");

router.get("/",getWeight);
router.post("/",addOrUpdateWeight);

module.exports=router;