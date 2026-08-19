import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-l from-primary to-secondary text-white py-8 mt-auto shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
          <div>
            <h3 className="font-bold text-lg mb-2 flex items-center justify-center md:justify-start">
              <i className="fas fa-mosque ml-2 text-accent"></i>
              مُصلّى والطقس
            </h3>
            <p className="text-sm text-gray-300">تطبيقك الشامل للصلاة والطقس</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-2">تواصل معنا</p>
            <div className="flex justify-center md:justify-start space-x-4 space-x-reverse">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-300">
              <i className="far fa-copyright ml-1"></i>
              2026 جميع الحقوق محفوظة
            </p>
            <p className="text-xs text-gray-400 mt-1">Salah & Sky © 2026</p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-6 pt-6 text-center">
          <p className="text-xs text-gray-400">
          mouad  تم التطوير بـ <i className="fas fa-heart text-red-500 mx-1"></i> للمسلمين حول العالم
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
