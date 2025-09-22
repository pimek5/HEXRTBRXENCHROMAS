import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Kopiuję całą zawartość z App.js jako HomePage
function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Discord OAuth configuration
  const DISCORD_CLIENT_ID = '1274276113660645389';
  const REDIRECT_URI = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://pimek5.github.io/HEXRTBRXENCHROMAS/auth/discord/callback.html';
  
  const BACKEND_URL = process.env.NODE_ENV === 'production' 
    ? 'https://radiant-integrity-production.up.railway.app'
    : 'http://localhost:3001';

  // Exchange authorization code for access token
  const exchangeCodeForToken = async (code) => {
    try {
      console.log('Exchanging code for token...');
      const response = await axios.post(`${BACKEND_URL}/auth/discord/callback`, {
        code: code,
        redirect_uri: REDIRECT_URI
      });

      console.log('Token exchange response:', response.data);
      const userData = response.data.user;
      
      if (userData) {
        setUser(userData);
        localStorage.setItem('discordUser', JSON.stringify(userData));
        console.log('User logged in successfully:', userData);
      } else {
        throw new Error('No user data received');
      }
    } catch (error) {
      console.error('Token exchange error:', error);
      const errorMessage = error.response?.data?.error || error.message;
      setError('Login failed: ' + errorMessage);
      
      // Clear any potentially corrupted data
      localStorage.removeItem('discordUser');
    }
  };

  // Check for OAuth callback code or existing user on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if we're on the callback page with a code
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
          console.log('OAuth code found, exchanging for token...');
          await exchangeCodeForToken(code);
          // Clear the code from URL
          window.history.replaceState({}, document.title, window.location.pathname);
          return;
        }

        // Check for existing user in localStorage
        const savedUser = localStorage.getItem('discordUser');
        if (savedUser) {
          console.log('Found saved user data');
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setError('Authentication error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array is intentional here

  // Handle Discord OAuth login
  const handleDiscordLogin = () => {
    const scope = 'identify';
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
    console.log('Redirecting to Discord OAuth:', discordAuthUrl);
    window.location.href = discordAuthUrl;
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('discordUser');
    console.log('User logged out');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold text-white">HEXRTBRXENCHROMAS</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-white hover:text-purple-300 transition-colors">Home</a>
              <a href="#explore" className="text-white hover:text-purple-300 transition-colors">Explore</a>
              <a href="#create" className="text-white hover:text-purple-300 transition-colors">Create</a>
              <a href="#community" className="text-white hover:text-purple-300 transition-colors">Community</a>
            </nav>

            <div className="flex items-center space-x-4">
              {error && (
                <div className="bg-red-500/20 text-red-300 px-3 py-1 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <img 
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white text-sm">{user.username}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleDiscordLogin}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>Login with Discord</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to the
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                HEXRTBRXENCHROMAS
              </span>
              Universe
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Discover, create, and share stunning visual modifications for your favorite games. 
              Join a community of creators pushing the boundaries of digital art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
                Explore Mods
              </button>
              <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all">
                Start Creating
              </button>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
        </section>

        {/* Featured Mods Section */}
        <section className="py-16 bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Modifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((mod) => (
                <div key={mod} className="group bg-white/5 backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">ChromaShift {mod}</h3>
                      <p className="text-sm text-purple-200">Visual Enhancement</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-purple-200 text-sm mb-4">
                      Transform your game world with stunning chromatic effects and enhanced lighting systems.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="text-purple-300 text-sm">4.9</span>
                      </div>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-8">
                <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
                <div className="text-white text-lg">Active Creators</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-8">
                <div className="text-4xl font-bold text-pink-400 mb-2">250K+</div>
                <div className="text-white text-lg">Mods Downloaded</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-8">
                <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-white text-lg">Supported Games</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                <span className="text-white font-bold">HEXRTBRXENCHROMAS</span>
              </div>
              <p className="text-purple-200 text-sm">
                Revolutionizing game modification with cutting-edge visual enhancements.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Browse Mods</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Create Account</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developer Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reddit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bug Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feature Requests</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center">
            <p className="text-purple-300 text-sm">
              © 2024 HEXRTBRXENCHROMAS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;