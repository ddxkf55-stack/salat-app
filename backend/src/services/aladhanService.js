const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../config');

const cache = new NodeCache({ stdTTL: config.cacheTTL });

class AladhanService {
  async getPrayerTimes(lat, lng, date = new Date()) {
    const cacheKey = `prayer_${lat}_${lng}_${date.toDateString()}`;
    const cached = cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const dateStr = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      
      const response = await axios.get(`https://api.aladhan.com/v1/timings/${dateStr}`, {
        params: {
          latitude: lat,
          longitude: lng,
          method: config.aladhanMethod
        }
      });

      const timings = response.data.data.timings;
      const result = {
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha
      };

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw new Error('Failed to fetch prayer times');
    }
  }
}

module.exports = new AladhanService();