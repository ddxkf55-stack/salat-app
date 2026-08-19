const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600 });

class MosqueService {
  async findNearbyMosques(lat, lng, radius = 5000) {
    const cacheKey = `mosques_${lat}_${lng}_${radius}`;
    const cached = cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await axios.get('https://overpass-api.de/api/interpreter', {
        params: {
          data: `[out:json][timeout:25];(node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng}););out center;`
        }
      });

      const result = response.data.elements.map(element => ({
        id: element.id,
        name: element.tags?.name || 'مسجد',
        lat: element.lat || element.center?.lat,
        lng: element.lon || element.center?.lon,
        distance: this.calculateDistance(lat, lng, element.lat || element.center?.lat, element.lon || element.center?.lon)
      })).sort((a, b) => a.distance - b.distance);

      cache.set(cacheKey, result);
      return result;
    } catch (error) {
      throw new Error('Failed to fetch mosques');
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

module.exports = new MosqueService();