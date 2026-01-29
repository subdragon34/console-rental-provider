require("dotenv").config();
const mongoose = require("mongoose");
const Console = require("../models/Console");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected for seeding");

    await Console.deleteMany({});
    const consoles = await Console.insertMany([
      {
        brand: "Sony",
        model: "PlayStation 5",
        condition: "excellent",
        dailyPrice: 15,
        specs: { storage: "1TB", edition: "Disc" },
        tags: ["popular", "4K"]
      },
      {
        brand: "Microsoft",
        model: "Xbox Series X",
        condition: "good",
        dailyPrice: 14,
        specs: { storage: "1TB", edition: "Standard" },
        tags: ["gamepass"]
      },
      {
        brand: "Nintendo",
        model: "Switch OLED",
        condition: "excellent",
        dailyPrice: 10,
        specs: { storage: "64GB", edition: "OLED" },
        tags: ["family"]
      }
    ]);

    console.log(`✅ Seeded ${consoles.length} consoles`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();
