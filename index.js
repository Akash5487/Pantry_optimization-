const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const { runConsumer } = require('./kafka/consumer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/pantry', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Kafka consumer
runConsumer().catch(console.error);

app.listen(5000, () => console.log('Server running on port 5000'));