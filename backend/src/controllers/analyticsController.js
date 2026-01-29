const Rental = require("../models/Rental");

exports.topConsoles = async (req, res) => {
  try {
    const result = await Rental.aggregate([
      // Ignore cancelled rentals
      { $match: { status: { $ne: "cancelled" } } },

      // Count rentals and sum revenue per console
      {
        $group: {
          _id: "$consoleId",
          rentalsCount: { $sum: 1 },
          revenue: { $sum: "$totalPrice" }
        }
      },

      // Join console details (multi-collection analytics)
      {
        $lookup: {
          from: "consoles",
          localField: "_id",
          foreignField: "_id",
          as: "console"
        }
      },
      { $unwind: "$console" },

      {
        $project: {
          _id: 0,
          consoleId: "$console._id",
          brand: "$console.brand",
          model: "$console.model",
          dailyPrice: "$console.dailyPrice",
          rentalsCount: 1,
          revenue: 1
        }
      },

      // Sort by demand
      { $sort: { rentalsCount: -1 } },

      // Show only top 10
      { $limit: 10 }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.revenueByMonth = async (req, res) => {
  try {
    const result = await Rental.aggregate([
      // Revenue makes most sense after return
      { $match: { status: "returned" } },

      // Group by year and month
      {
        $group: {
          _id: {
            year: { $year: "$startDate" },
            month: { $month: "$startDate" }
          },
          totalRevenue: { $sum: "$totalPrice" },
          rentalsCount: { $sum: 1 }
        }
      },

      // Chronological sort
      { $sort: { "_id.year": 1, "_id.month": 1 } },

      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          rentalsCount: 1,
          totalRevenue: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
