const mongoose = require("mongoose");

const nutritionLogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, //  important for queries
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodMaster",
      required: true,
    },

    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    quantityGrams: {
      type: Number,
      required: true,
      min: 1,
    },

    calories: {
      type: Number,
      required: true,
      min: 1,
    },

    protein: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

//  Compound index for fast & secure queries
nutritionLogSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model("NutritionLog", nutritionLogSchema);