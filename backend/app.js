const express = require("express");
const mongoose = require("mongoose");
const feedbackRoutes=require('./src/routes/feedBackRoute')

require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB

app.get('/api/feedback', (req, res) => {
    res.send("Feedback endpoint");
});
app.get('/', (req, res) => {
    res.send("Server is running!");
});
app.get('/', (req, res) => {
    res.send("Server is live and running!");
});



app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.post('/api/feedback', (req, res) => {
  const feedback = req.body;
  // Process feedback...
  res.status(200).json({ message: 'Feedback received' });
});
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

