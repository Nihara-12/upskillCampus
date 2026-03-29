import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";



dotenv.config();

const app = express();

/* -------- MIDDLEWARES (FIRST) -------- */
app.use(cors());
app.use(express.json());

/* -------- ROUTES (SECOND) -------- */
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    user: req.user
  });
});


app.get("/", (req, res) => {
  res.send("DineLink Backend Running 🚀");
});

/* -------- DB CONNECTION (THIRD) -------- */
connectDB();

/* -------- SERVER START (LAST) -------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
