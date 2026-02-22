const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // 🔥 critical
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true,
    },

    exerciseName: {
      type: String,
      required: true,
      trim: true,
    },

    sets: {
      type: Number,
      required: true,
      min: 1,
    },

    reps: {
      type: Number,
      required: true,
      min: 1,
    },

    weight: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Optimized for dashboard queries
workoutSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model("Workout", workoutSchema);