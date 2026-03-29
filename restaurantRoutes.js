import express from "express";
import Restaurant from "../models/Restaurant.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ADD RESTAURANT (only restaurant owners) */
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "restaurant") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, cuisine, address } = req.body;

    const restaurant = new Restaurant({
      name,
      cuisine,
      address,
      owner: req.user.id
    });

    await restaurant.save();

    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET ALL RESTAURANTS (public) */
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("owner", "name email");
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
