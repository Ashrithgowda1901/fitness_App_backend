const NutritionLog=require("../models/NutritionLog.model");
const FoodMaster=require("../models/FoodMaster.model");

const getNutrition=async(req,res)=>{

    const {date}=req.query;

    if(!date)
    {
        return res.status(400).json({
            message:"Date is required"
        })
    }
    try
    {
        const  entries=await   NutritionLog.find({user: req.user.id,date:date}).sort({createdAt:1});
        let totalCalories=0; 
        let totalProtein=0;

        entries.forEach(entry => {
            totalCalories+=entry.calories;
            totalProtein+=entry.protein  
        });
        return res.status(200).json({
            date,
            entries,
            totalCalories,
            totalProtein
        });
    }
    catch(err)
    {
       
        return res.status(500).json({
            message:err.message
        })
    }
}

const addNutrition=async(req,res)=>{

    const {date,foodId,quantityGrams}=req.body;

    if(!date||!foodId||quantityGrams==null)
    {
        return res.status(400).json({
            message:"date and quantityGrams are required"
        })
    }

    try
    {
        
        const food=await FoodMaster.findOne({_id:foodId})

        if(!food)
        {
            return res.status(400).json({
                message: "Food not found. Please select again."
            })
        }

        const caloriesPer100g=food.caloriesPer100g;
        const proteinPer100g=food.proteinPer100g;
        const foodName=food.foodName;

        const foodToAdd=new NutritionLog({
            user: req.user.id, 
            date,
            foodId,
            foodName,
            quantityGrams,
            calories:(quantityGrams*caloriesPer100g)/100,
            protein:(quantityGrams*proteinPer100g)/100,

        })

        const addedFood=await foodToAdd.save()
        return res.status(201).json({
            message:"Food logged successfully",
            food:addedFood
        });
    }
    catch(err)
    {
        if(err.name==="ValidationError")
        {
            return res.status(400).json({
                message:err.message
            })
        }
        return res.status(500).json({
            message:err.message
        })
    }
}
module.exports={
    getNutrition,
    addNutrition
}