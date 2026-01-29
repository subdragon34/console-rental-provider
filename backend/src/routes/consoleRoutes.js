const express = require("express");
const router = express.Router();

const {
  getAllConsoles,
  createConsole,
  addTag,
  removeTag
} = require("../controllers/consoleController");

const { authRequired, requireAdmin } = require("../middleware/auth");

router.get("/", getAllConsoles);
router.post("/", authRequired, requireAdmin, createConsole);

router.patch("/:id/tags/add", authRequired, requireAdmin, addTag);
router.patch("/:id/tags/remove", authRequired, requireAdmin, removeTag);

module.exports = router;
