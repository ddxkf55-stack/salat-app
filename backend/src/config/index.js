require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  aladhanMethod: process.env.ALADHAN_METHOD || 3,
  nodeEnv: process.env.NODE_ENV || 'development',
  cacheTTL: 3600
};