const express = require("express");
const router = express.Router();

const { authRequired } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/favorites", authRequired, userController.addFavorite);
router.patch("/favorites/note", authRequired, userController.updateFavoriteNote);

module.exports = router;
