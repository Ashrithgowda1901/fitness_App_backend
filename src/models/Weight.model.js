const mongoose = require("mongoose");

const weightSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

//  One weight per user per day
weightSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Weight", weightSchema);