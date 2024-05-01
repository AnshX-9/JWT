require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Import routes
const routeAuth = require('./routes/routeAuth');

// Middleware
app.use(bodyParser.json());


app.use('/auth', routeAuth);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
