import React, { useState } from 'react';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState('google');

  const searchEngines = [
    { id: 'google', name: 'جوجل', icon: 'fab fa-google', url: 'https://www.google.com/search?q=' },
    { id: 'bing', name: 'بينج', icon: 'fab fa-microsoft', url: 'https://www.bing.com/search?q=' },
    { id: 'duckduckgo', name: 'داك داك جو', icon: 'fab fa-duckduckgo', url: 'https://duckduckgo.com/?q=' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const engine = searchEngines.find(eng => eng.id === searchEngine);
      window.open(`${engine.url}${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 focus-within:border-secondary transition-all duration-300 hover:shadow-3xl">
          <select
            value={searchEngine}
            onChange={(e) => setSearchEngine(e.target.value)}
            className="px-4 py-4 bg-gray-50 border-l border-gray-200 text-gray-700 focus:outline-none cursor-pointer hover:bg-gray-100 transition-colors font-semibold"
          >
            {searchEngines.map(engine => (
              <option key={engine.id} value={engine.id}>{engine.name}</option>
            ))}
          </select>
          
          <div className="flex-1 flex items-center px-6">
            <i className="fas fa-search text-gray-400 ml-3 text-lg"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ابحث في الإنترنت..."
              className="flex-1 py-4 focus:outline-none text-gray-800 text-lg bg-transparent"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-l from-secondary to-primary text-white font-bold hover:from-primary hover:to-secondary transition-all duration-300 flex items-center gap-2"
          >
            <i className="fas fa-search"></i>
            <span className="hidden md:inline">بحث</span>
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <i className="fas fa-keyboard ml-2"></i>
        اضغط Enter للبحث السريع
      </div>
    </div>
  );
};

export default SearchEngine;