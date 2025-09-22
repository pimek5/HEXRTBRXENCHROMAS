import React, { useState, useEffect, useRef } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../bloom.css';
import logo from "../Download.png";
import bgImage from "../87febddd0466e384f137a6abd328e19c9.jpg";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import LoginModal from '../LoginModal';

const firebaseConfig = {
  apiKey: "AIzaSyDYNK8N1BZSRz5aGKQ8SYlHCPFj9vHLsM4",
  authDomain: "neon-district-d4d57.firebaseapp.com",
  projectId: "neon-district-d4d57",
  storageBucket: "neon-district-d4d57.appspot.com",
  messagingSenderId: "982346781890",
  appId: "1:982346781890:web:abc123def456"
};

// Initialize Firebase only if no apps exist
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Snow particle component
function DotParticles() {
  const [dots, setDots] = useState([]);
  // Area just above 'For Players' (estimate 600px from top, adjust as needed)
  // Make particles appear right above 'For Players' heading
  const areaTop = 620; // px from top, just above 'For Players' section
  const areaHeight = 60; // smaller area for concentrated effect
  const areaBottom = areaTop + areaHeight;

  const containerRef = useRef(null);

  useEffect(() => {
    const generateDots = () => {
      const newDots = [];
      for (let i = 0; i < 15; i++) {  // Less dots for more subtle effect
        newDots.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: areaTop + Math.random() * areaHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,  // Slower horizontal movement
          speedY: Math.random() * 0.3 + 0.1, // Slower falling
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      setDots(newDots);
    };

    generateDots();
    window.addEventListener('resize', generateDots);

    return () => window.removeEventListener('resize', generateDots);
  }, [areaBottom]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          x: dot.x + dot.speedX,
          y: dot.y + dot.speedY,
          // Reset if out of area bounds
          ...(dot.y > areaBottom || dot.x < 0 || dot.x > window.innerWidth ? {
            x: Math.random() * window.innerWidth,
            y: areaTop,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.8 + 0.2
          } : {})
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [areaTop, areaBottom]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-blue-300"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}

function HomePage() {
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mods, setMods] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Auto-save user state to localStorage for persistence
      if (currentUser) {
        localStorage.setItem('hexrt_user', JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        }));
      } else {
        localStorage.removeItem('hexrt_user');
      }
    });

    // Check for saved user state on mount
    const savedUser = localStorage.getItem('hexrt_user');
    if (savedUser && !user) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('hexrt_user');
      }
    }

    return () => unsubscribe();
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem('hexrt_user');
  };

  // Featured mods data
  useEffect(() => {
    setMods([
      {
        id: 1,
        title: "Neon Horizons",
        author: "CyberCrafter",
        downloads: "15.2M",
        image: "/api/placeholder/300/200",
        category: "Adventure"
      },
      {
        id: 2,
        title: "Data Stream",
        author: "NetRunner",
        downloads: "8.7M",
        image: "/api/placeholder/300/200",
        category: "Tech"
      },
      {
        id: 3,
        title: "Ghost Protocol",
        author: "ShadowDev",
        downloads: "12.1M",
        image: "/api/placeholder/300/200",
        category: "Stealth"
      }
    ]);
  }, []);

  // Enhanced search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMods = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mods.filter(mod => 
        mod.title.toLowerCase().includes(query.toLowerCase()) ||
        mod.author.toLowerCase().includes(query.toLowerCase()) ||
        mod.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMods(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, mods]);

  // Get positions for mods
  const getModTop = (index) => {
    const baseTop = 700; // Start position
    const spacing = 120; // Space between mods
    return baseTop + (index * spacing);
  };

  return (
    <>
      <DotParticles />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
            filter: 'blur(0.5px) brightness(0.3)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/40 to-black/80" />

        {/* Header */}
        <nav className="relative z-50 flex justify-between items-center p-6 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold">HEXRTBRXENCHROMAS</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-blue-400 transition-colors">Browse Mods</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Create</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Community</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.displayName || user.email}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition-colors"
                >
                  Login
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition-colors">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            HEXRTBRXENCHROMAS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            The ultimate hub for modders and creators. Build, share, and explore the future of digital content.
          </p>
          
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mb-8">
            <input
              type="text"
              placeholder="Search for mods, creators, and content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-black/60 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 backdrop-blur-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              🔍
            </button>
            
            {/* Search Results */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-gray-600 rounded-lg backdrop-blur-sm z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-400">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    {searchResults.map(mod => (
                      <div key={mod.id} className="p-3 hover:bg-gray-800 border-b border-gray-700 last:border-b-0">
                        <div className="font-semibold">{mod.title}</div>
                        <div className="text-sm text-gray-400">by {mod.author} • {mod.downloads} downloads</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400">No results found</div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Start Creating
            </button>
            <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Browse Mods
            </button>
          </div>
        </div>

        {/* For Players Section */}
        <section className="relative z-30 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              For Players
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold mb-3">Discover Mods</h3>
                <p className="text-gray-300">Browse thousands of high-quality mods created by talented developers worldwide.</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Easy Installation</h3>
                <p className="text-gray-300">One-click install system with automatic updates and dependency management.</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
                <p className="text-gray-300">All mods are scanned and verified to ensure your gaming experience is safe.</p>
              </div>
            </div>

            {/* Featured Mods */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Featured Mods</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {mods.map((mod) => (
                  <div key={mod.id} className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all group">
                    <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600"></div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-2">{mod.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">by {mod.author}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">{mod.category}</span>
                        <span className="text-xs text-gray-400">{mod.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* For Modders Section */}
        <section className="relative z-30 py-20 px-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              For Modders
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Build the Future</h3>
                <p className="text-gray-300 mb-6">
                  Join our community of creators and bring your ideas to life with our comprehensive development tools and resources.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">✓</div>
                    <span>Advanced modding framework</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">✓</div>
                    <span>Real-time collaboration tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">✓</div>
                    <span>Monetization opportunities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">✓</div>
                    <span>24/7 developer support</span>
                  </div>
                </div>
                
                <button className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Start Developing
                </button>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
                <h4 className="text-xl font-bold mb-4">Developer Stats</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Developers</span>
                    <span className="font-bold text-purple-400">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mods Published</span>
                    <span className="font-bold text-purple-400">156,293</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Downloads</span>
                    <span className="font-bold text-purple-400">2.1B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue Shared</span>
                    <span className="font-bold text-purple-400">$8.4M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="relative z-30 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Latest News
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-500 transition-all">
                <div className="h-48 bg-gradient-to-br from-yellow-600 to-orange-600"></div>
                <div className="p-6">
                  <div className="text-xs text-yellow-400 mb-2">UPDATE • 2 days ago</div>
                  <h3 className="text-xl font-bold mb-3">Platform 2.0 Launch</h3>
                  <p className="text-gray-300 text-sm">Experience the next generation of modding with enhanced tools and improved performance.</p>
                </div>
              </article>
              
              <article className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-500 transition-all">
                <div className="h-48 bg-gradient-to-br from-green-600 to-teal-600"></div>
                <div className="p-6">
                  <div className="text-xs text-green-400 mb-2">EVENT • 1 week ago</div>
                  <h3 className="text-xl font-bold mb-3">ModJam 2024 Winners</h3>
                  <p className="text-gray-300 text-sm">Congratulations to all participants in our annual modding competition. See the amazing entries!</p>
                </div>
              </article>
              
              <article className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-500 transition-all">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600"></div>
                <div className="p-6">
                  <div className="text-xs text-blue-400 mb-2">FEATURE • 2 weeks ago</div>
                  <h3 className="text-xl font-bold mb-3">AI-Assisted Modding</h3>
                  <p className="text-gray-300 text-sm">Introducing our new AI tools to help creators build better mods faster than ever before.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-30 bg-black/60 backdrop-blur-sm border-t border-gray-800 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img src={logo} alt="Logo" className="h-8 w-auto" />
                  <span className="font-bold">HEXRTBRXENCHROMAS</span>
                </div>
                <p className="text-gray-400 text-sm">
                  The ultimate platform for modders and creators to build, share, and monetize their digital content.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Platform</h4>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>Browse Mods</li>
                  <li>Create Content</li>
                  <li>Developer Tools</li>
                  <li>API Access</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Community</h4>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>Discord Server</li>
                  <li>Forums</li>
                  <li>Events</li>
                  <li>Creators Wiki</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="text-gray-400 space-y-2 text-sm">
                  <li>Content Rules</li>
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>DMCA Policy</li>
                  <li>California Privacy</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">📱</a>
              <a href="#" className="text-gray-400 hover:text-white text-2xl">🎤</a>
            </div>
            <p className="text-xs text-gray-500 mt-8 text-center">© HEXRTBRXENCHROMAS 2025. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}

export default HomePage;