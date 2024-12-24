const express = require("express");
const mongoose = require("mongoose");
const Feedback = require("../models/Feedback.js"); // Replace with your actual model

const approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid feedback ID." });
    }
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }
    if (feedback.approved) {
      return res.status(400).json({ message: "Feedback is already approved." });
    }
    feedback.approved = true;
    await feedback.save();
    res.status(200).json({ message: "Feedback approved successfully." });
  } catch (error) {
    
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid feedback ID." });
    }
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }
    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
  
  }
};

module.exports = { approveFeedback, deleteFeedback };
