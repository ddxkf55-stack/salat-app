class QiblaService {
  calculateQibla(lat, lng) {
    const MECCA_LAT = 21.4225;
    const MECCA_LNG = 39.8262;
    
    const phiK = (MECCA_LAT * Math.PI) / 180.0;
    const lambdaK = (MECCA_LNG * Math.PI) / 180.0;
    const phi = (lat * Math.PI) / 180.0;
    const lambda = (lng * Math.PI) / 180.0;
    
    const psi = (180.0 / Math.PI) * Math.atan2(
      Math.sin(lambdaK - lambda),
      Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
    );
    
    return Math.round(psi * 100) / 100;
  }
}

module.exports = new QiblaService();