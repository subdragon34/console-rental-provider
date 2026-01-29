const Console = require("../models/Console");

exports.getAllConsoles = async (req, res) => {
  const consoles = await Console.find({ isActive: true });
  res.json(consoles);
};

exports.createConsole = async (req, res) => {
  const console = await Console.create(req.body);
  res.status(201).json(console);
};
exports.addTag = async (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  if (!tag) return res.status(400).json({ message: "Tag is required" });

  await Console.updateOne(
    { _id: id },
    { $push: { tags: tag } }
  );

  res.json({ message: "Tag added" });
};

exports.removeTag = async (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;

  if (!tag) return res.status(400).json({ message: "Tag is required" });

  await Console.updateOne(
    { _id: id },
    { $pull: { tags: tag } }
  );

  res.json({ message: "Tag removed" });
};
