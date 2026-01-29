const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    consoleId: { type: mongoose.Schema.Types.ObjectId, ref: "Console", required: true },
    note: { type: String, default: "" },
    addedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    favorites: { type: [favoriteSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
