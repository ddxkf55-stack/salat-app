const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const prayerRoutes = require('./routes/prayerRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const qiblaRoutes = require('./routes/qiblaRoutes');
const mosqueRoutes = require('./routes/mosqueRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Use routes
app.use('/api/prayer', prayerRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/qibla', qiblaRoutes);
app.use('/api/mosques', mosqueRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Salah & Sky API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

module.exports = app;