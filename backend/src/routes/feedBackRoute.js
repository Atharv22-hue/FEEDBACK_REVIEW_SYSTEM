const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback.js");

// Route to fetch all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    // Calculate average rating
    const totalRating = feedbacks.reduce((sum, feedback) => sum + (feedback.rating || 0), 0);
    const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0;

    res.json({
      reviews: feedbacks, // Return reviews as "reviews"
      averageRating: averageRating.toFixed(2), // Keep 2 decimal places
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

// Route to update feedback status (Approve/Reject)
router.patch("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }, // Expect { status: "approved" } in the request body
      { new: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Failed to update feedback" });
  }
});

// Route to delete feedback
router.delete("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Failed to delete feedback" });
  }
});

module.exports = router;
