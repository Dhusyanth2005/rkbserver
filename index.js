require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');
const startKeepAlive = require('./src/utils/keepAlive');

const authRoutes = require('./src/routes/authRoutes');
const homeHeroRoutes = require('./src/routes/homeHeroRoutes');
const workRoutes = require('./src/routes/workRoutes');
const aboutRoutes = require('./src/routes/aboutRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check & ping (no DB needed — used by Vercel Cron and keep-alive)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/ping', (req, res) => {
  res.json({ status: 'alive', timestamp: new Date().toISOString() });
});

// Connect to MongoDB on each request (cached after first connection)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('DB connection failed:', error.message);
    res.status(503).json({ message: 'Database unavailable, try again later.' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', homeHeroRoutes);
app.use('/api/works', workRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Export for Vercel serverless
module.exports = app;

// Start server only in local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    startKeepAlive(); // Start keep-alive cron in local/traditional server
  });
}