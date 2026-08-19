import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Tabs from './components/Layout/Tabs';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import PrayerPage from './pages/PrayerPage';
import WeatherPage from './pages/WeatherPage';
import QiblaPage from './pages/QiblaPage';
import MosquesPage from './pages/MosquesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-arabic" dir="rtl">
        <Header />
        <Tabs />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prayer" element={<PrayerPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/qibla" element={<QiblaPage />} />
            <Route path="/mosques" element={<MosquesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;