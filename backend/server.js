const app = require('./src/app');
const config = require('./src/config');

const server = app.listen(config.port, () => {
  console.log('==========================================');
  console.log('   Salah & Sky API Server');
  console.log('==========================================');
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`API Key configured: ${config.openWeatherApiKey ? 'Yes' : 'No'}`);
  console.log('==========================================');
  console.log('Endpoints:');
  console.log(`  - GET http://localhost:${config.port}/`);
  console.log(`  - GET http://localhost:${config.port}/health`);
  console.log(`  - GET http://localhost:${config.port}/api/prayer/times`);
  console.log(`  - GET http://localhost:${config.port}/api/weather/current`);
  console.log(`  - GET http://localhost:${config.port}/api/qibla/direction`);
  console.log(`  - GET http://localhost:${config.port}/api/mosques/nearby`);
  console.log('==========================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;