import React from 'react';

const QuickLinks = () => {
  const links = [
    { name: 'جوجل', url: 'https://www.google.com', icon: 'fab fa-google', color: 'from-blue-500 to-blue-600' },
    { name: 'يوتيوب', url: 'https://www.youtube.com', icon: 'fab fa-youtube', color: 'from-red-600 to-red-700' },
    { name: 'ويكيبيديا', url: 'https://ar.wikipedia.org', icon: 'fab fa-wikipedia-w', color: 'from-gray-700 to-gray-800' },
    { name: 'تويتر', url: 'https://twitter.com', icon: 'fab fa-twitter', color: 'from-blue-400 to-blue-500' },
    { name: 'فيسبوك', url: 'https://www.facebook.com', icon: 'fab fa-facebook-f', color: 'from-blue-700 to-blue-800' },
    { name: 'إنستغرام', url: 'https://www.instagram.com', icon: 'fab fa-instagram', color: 'from-pink-600 to-purple-600' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mt-12">
      <h3 className="text-center text-gray-600 mb-8 text-lg font-semibold flex items-center justify-center gap-2">
        <i className="fas fa-bookmark text-accent"></i>
        روابط سريعة
      </h3>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gradient-to-br ${link.color} text-white rounded-2xl p-6 text-center transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 group`}
          >
            <i className={`${link.icon} text-3xl mb-3 block group-hover:scale-110 transition-transform`}></i>
            <span className="font-semibold text-sm">{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;