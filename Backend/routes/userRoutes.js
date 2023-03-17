const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  getConnectedUser,
  getAllusers,
} = require("../controllers/userController");
const { DataValidation } = require("../middleware/DataValidation");
const { protect } = require("../middleware/authMiddleware");
router.get("/", getAllusers);
router.post("/signup", DataValidation, signup);
router.post("/signin", signin);
router.get("/singleUser/:id", protect, getConnectedUser);

module.exports = router;