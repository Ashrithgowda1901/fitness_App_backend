const mongoose = require("mongoose");

const foodMasterSchema = mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,   // 🔥 normalize
      unique: true,      // 🔥 prevent duplicates
      index: true,
    },

    caloriesPer100g: {
      type: Number,
      required: true,
      min: 0,
    },

    proteinPer100g: {
      type: Number,
      required: true,   // ✅ fixed typo
      min: 0,
    },

    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodMaster", foodMasterSchema);