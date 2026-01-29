const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    consoleId: { type: mongoose.Schema.Types.ObjectId, ref: "Console", required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    status: { type: String, enum: ["active", "returned", "cancelled"], default: "active" },
    totalPrice: { type: Number, required: true, min: 0 },

    returnLog: {
      returnedAt: { type: Date, default: null },
      lateDays: { type: Number, default: 0 },
      fine: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

rentalSchema.index({ consoleId: 1, status: 1 });
rentalSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Rental", rentalSchema);
