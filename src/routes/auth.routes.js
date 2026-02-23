const express=require("express");
const { registerUser, loginUser, logout } = require("../controller/auth.controller");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const optionAuthMiddle=require("../middlewares/optionalAuth.middleware");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",optionAuthMiddle,(req,res)=>{
    return res.status(200).json({
        user:req.user
    });
});
router.post("/logout",logout)
module.exports=router;