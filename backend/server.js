const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Routes
const achievementRoutes = require('./routes/achievementRoutes');
app.use('/api/achievements', achievementRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.send('University Achievement API is running!');
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});