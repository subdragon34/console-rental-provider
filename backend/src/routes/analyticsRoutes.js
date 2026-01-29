const express = require("express");
const router = express.Router();

const { authRequired, requireAdmin } = require("../middleware/auth");
const { topConsoles, revenueByMonth } = require("../controllers/analyticsController");

router.get("/top-consoles", authRequired, requireAdmin, topConsoles);
router.get("/revenue-monthly", authRequired, requireAdmin, revenueByMonth);

module.exports = router;
