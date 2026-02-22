const Weight = require("../models/Weight.model");

const getWeight = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      message: "date query parameter is required",
    });
  }

  try {
    const weight = await Weight.findOne({
      user: req.user.id,   // ✅ user scoped
      date,
    });

    return res.status(200).json({ weight: weight ?? null });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const addOrUpdateWeight = async (req, res) => {
  const { date, weight } = req.body;

  if (!date || weight == null) {
    return res.status(400).json({
      message: "date and weight are required",
    });
  }

  try {
    const savedWeight = await Weight.findOneAndUpdate(
      {
        user: req.user.id, // ✅ CRITICAL
        date,
      },
      {
        weight,
      },
      {
        new: true,
        upsert: true, //  create if not exists
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Weight saved successfully",
      weight: savedWeight,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to save weight",
      error: err.message,
    });
  }
};

module.exports = {
  getWeight,
  addOrUpdateWeight,
};