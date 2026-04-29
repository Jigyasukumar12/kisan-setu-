require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Start server — DB connection is attempted but won't block startup
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('⚠️  Running without MongoDB. Some routes may not work.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 KisanSetu server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV}`);
    console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
  });
};

startServer();
