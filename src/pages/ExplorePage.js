import React, { useState } from 'react';

function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const mods = [
    {
      id: 1,
      title: "Neon Horizons",
      author: "CyberCrafter",
      downloads: "15.2M",
      rating: 4.8,
      category: "Adventure",
      description: "Explore a cyberpunk world with enhanced graphics and new quests."
    },
    {
      id: 2,
      title: "Data Stream",
      author: "NetRunner",
      downloads: "8.7M",
      rating: 4.6,
      category: "Tech",
      description: "Advanced hacking mechanics and digital interfaces."
    },
    {
      id: 3,
      title: "Ghost Protocol",
      author: "ShadowDev",
      downloads: "12.1M",
      rating: 4.9,
      category: "Stealth",
      description: "Enhanced stealth gameplay with new tools and mechanics."
    },
    {
      id: 4,
      title: "Neural Network",
      author: "AICodex",
      downloads: "6.3M",
      rating: 4.7,
      category: "Tech",
      description: "AI-powered NPCs with realistic behavior patterns."
    },
    {
      id: 5,
      title: "Urban Decay",
      author: "CityBuilder",
      downloads: "9.8M",
      rating: 4.5,
      category: "Environment",
      description: "Detailed urban environments with dynamic weather."
    },
    {
      id: 6,
      title: "Quantum Leap",
      author: "TimeTraveler",
      downloads: "11.2M",
      rating: 4.8,
      category: "Adventure",
      description: "Time manipulation mechanics and paradox storylines."
    }
  ];

  const categories = ['all', 'Adventure', 'Tech', 'Stealth', 'Environment', 'Graphics', 'Gameplay'];

  const filteredMods = mods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedMods = [...filteredMods].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return parseFloat(b.downloads) - parseFloat(a.downloads);
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Explore Mods
          </h1>
          <p className="text-gray-300">
            Discover amazing content created by our community of talented modders.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search mods, creators, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
              🔍
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-400 ml-auto">
              {sortedMods.length} results found
            </div>
          </div>
        </div>

        {/* Mods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMods.map(mod => (
            <div key={mod.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all group cursor-pointer">
              {/* Mod Image */}
              <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 relative">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>

              {/* Mod Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">
                    {mod.title}
                  </h3>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                    {mod.category}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-2">by {mod.author}</p>
                
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                  {mod.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(mod.rating) ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{mod.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">{mod.downloads} downloads</span>
                </div>

                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm font-semibold transition-colors">
                    Install
                  </button>
                  <button className="px-3 py-2 border border-gray-600 hover:border-gray-400 rounded text-sm transition-colors">
                    ♡
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Mods
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;