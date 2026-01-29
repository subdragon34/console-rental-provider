const Rental = require("../models/Rental");
const Console = require("../models/Console");

function daysBetween(start, end) {
  const ms = new Date(end) - new Date(start);
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

exports.createRental = async (req, res) => {
  try {
    const { consoleId, startDate, endDate } = req.body;

    if (!consoleId || !startDate || !endDate) {
      return res.status(400).json({ message: "consoleId, startDate, endDate are required" });
    }

    const consoleDoc = await Console.findOne({ _id: consoleId, isActive: true });
    if (!consoleDoc) return res.status(404).json({ message: "Console not found" });

    const overlap = await Rental.findOne({
      consoleId,
      status: "active",
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
      ]
    });
    if (overlap) return res.status(409).json({ message: "Console already rented for these dates" });

    const days = daysBetween(startDate, endDate);
    const totalPrice = days * consoleDoc.dailyPrice;

    const rental = await Rental.create({
      userId: req.user.userId,
      consoleId,
      startDate,
      endDate,
      totalPrice
    });

    await Console.updateOne({ _id: consoleId }, { $inc: { totalRentals: 1 } });

    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRentals = async (req, res) => {
  const rentals = await Rental.find({ userId: req.user.userId })
    .populate("consoleId", "brand model dailyPrice specs")
    .sort({ createdAt: -1 });

  res.json(rentals);
};

exports.returnRental = async (req, res) => {
  try {
    const rentalId = req.params.id;

    const rental = await Rental.findOne({ _id: rentalId, userId: req.user.userId });
    if (!rental) return res.status(404).json({ message: "Rental not found" });
    if (rental.status !== "active") {
      return res.status(400).json({ message: "Only active rentals can be returned" });
    }

    const now = new Date();
    const due = new Date(rental.endDate);
    const lateMs = now - due;
    const lateDays = lateMs > 0 ? Math.ceil(lateMs / (1000 * 60 * 60 * 24)) : 0;
    const fine = lateDays * 5;

    await Rental.updateOne(
      { _id: rentalId },
      {
        $set: {
          status: "returned",
          "returnLog.returnedAt": now,
          "returnLog.lateDays": lateDays,
          "returnLog.fine": fine
        }
      }
    );

    const updated = await Rental.findById(rentalId);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelRental = async (req, res) => {
  try {
    const rentalId = req.params.id;

    const rental = await Rental.findOne({ _id: rentalId, userId: req.user.userId });
    if (!rental) return res.status(404).json({ message: "Rental not found" });
    if (rental.status !== "active") {
      return res.status(400).json({ message: "Only active rentals can be cancelled" });
    }

    await Rental.updateOne({ _id: rentalId }, { $set: { status: "cancelled" } });

    res.json({ message: "Rental cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
