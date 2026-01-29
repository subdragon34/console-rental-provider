const express = require("express");
const router = express.Router();

const { authRequired } = require("../middleware/auth");
const rentalController = require("../controllers/rentalController");

router.post("/", authRequired, rentalController.createRental);
router.get("/my", authRequired, rentalController.getMyRentals);
router.patch("/:id/return", authRequired, rentalController.returnRental);
router.patch("/:id/cancel", authRequired, rentalController.cancelRental);

module.exports = router;
