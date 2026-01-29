const User = require("../models/User");

exports.addFavorite = async (req, res) => {
  const { consoleId } = req.body;
  if (!consoleId) return res.status(400).json({ message: "consoleId is required" });

  await User.updateOne(
    { _id: req.user.userId },
    { $push: { favorites: { consoleId } } }
  );

  res.json({ message: "Added to favorites" });
};

exports.updateFavoriteNote = async (req, res) => {
  const { consoleId, note } = req.body;
  if (!consoleId || note === undefined) {
    return res.status(400).json({ message: "consoleId and note are required" });
  }

  await User.updateOne(
    { _id: req.user.userId, "favorites.consoleId": consoleId },
    { $set: { "favorites.$.note": note } }
  );

  res.json({ message: "Favorite note updated" });
};
