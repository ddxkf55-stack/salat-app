const axios = require('axios');
const NodeCache = require('node-cache');
const config = require('../config');

const cache = new NodeCache({ stdTTL: 1800 }); // 30 minutes

class WeatherService {
  async getCurrentWeather(lat, lng) {
    const cacheKey = `weather_${lat}_${lng}`;
    const cached = cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon: lng,
          appid: config.openWeatherApiKey,
          units: 'metric',
          lang: 'ar'
        }
      });

      const result = {
        temp: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        wind_speed: response.data.wind.speed,
        condition: response.data.weather[0].main
      };

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  }

  async getHourlyForecast(lat, lng) {
    const cacheKey = `forecast_${lat}_${lng}`;
    const cached = cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat,
          lon: lng,
          appid: config.openWeatherApiKey,
          units: 'metric',
          lang: 'ar'
        }
      });

      const result = response.data.list.slice(0, 8).map(item => ({
        time: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[0].description,
        condition: item.weather[0].main,
        icon: item.weather[0].icon
      }));

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw new Error('Failed to fetch forecast');
    }
  }
}

module.exports = new WeatherService();