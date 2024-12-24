const Feedback = require("../models/Feedback.js");

// Submit feedback 

const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const feedback = new Feedback({ rating, comment });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback.", error });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    const averageRating = feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length || 0;
    res.status(200).json({ feedbacks, averageRating });
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks.", error });
  }
};

const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;
  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found." });
    feedback.approved = approved;
    await feedback.save();
    res.status(200).json({ message: "Feedback updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback.", error });
  }
};

const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback.", error });
  }
};

module.exports = { submitFeedback, getFeedbacks, updateFeedback, deleteFeedback };
