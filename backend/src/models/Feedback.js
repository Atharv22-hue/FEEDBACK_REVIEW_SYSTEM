const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rating:Number,
    comment: String,
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback; // Ensure you're exporting the model
