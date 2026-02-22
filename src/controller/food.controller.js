const FoodMaster=require("../models/FoodMaster.model");

const getAllFoods=async(req,res)=>{

    try
    {
        const foods=await FoodMaster.find().sort({foodName:1});
        return res.status(200).json(foods);
    }
    catch(err)
    {
        return res.status(500).json({
            messsage:"Failed to fetch foods",
            error:err.messsage
        })
    }
};

const addFood=async(req,res)=>{
    try
    {
       const{foodName,caloriesPer100g,proteinPer100g}=req.body;
       
       if(!foodName||caloriesPer100g==null ||proteinPer100g==null )
       {
            return res.status(400).json({
                messsage:"foodName, caloriesPer100g and proteinPer100g are required"
            })            
       }

       const food=new FoodMaster({
        foodName,
        caloriesPer100g,
        proteinPer100g,
        isCustom:true
       })

       const savedFood=await food.save()

       return res.status(201).json({
        message: "Food added successfully",
        food: savedFood
       });
    }
    catch(err)
    {
        return res.status(500).json({
            message: "Failed to add food",
            error: error.message
        });
    }
}


module.exports={
    getAllFoods,
    addFood
}


