const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    condition: { type: String, enum: ["new", "excellent", "good", "fair"], default: "good" },
    dailyPrice: { type: Number, required: true, min: 0 },

    specs: {
      storage: { type: String, default: "" },
      edition: { type: String, default: "" }
    },

    tags: { type: [String], default: [] },

    isActive: { type: Boolean, default: true },
    totalRentals: { type: Number, default: 0 }
  },
  { timestamps: true }
);

consoleSchema.index({ brand: 1, model: 1 });

module.exports = mongoose.model("Console", consoleSchema);
