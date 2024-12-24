const express = require("express");
const mongoose = require("mongoose");
const feedbackRoutes=require('./src/routes/feedBackRoute')

require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

mongoose.connect('mongodb+srv://pant:tTEBIp7nEP7de3PE@atharv.09g0rli.mongodb.net/', {
  //  useNewUrlParser: true, // REMOVE this line
//    useUnifiedTopology: true // REMOVE this line
}).then(() => {
    console.log('MongoDB connected successfully!');
}).catch(err => {
    console.error('MongoDB connection failed:', err);
});

// Routes
app.use('/api/feedback', feedbackRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

module.exports = app;
