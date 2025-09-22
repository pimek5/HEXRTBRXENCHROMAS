import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../bloom.css';
import logo from "../Download.png";
import bgImage from "../87febddd0466e384f137a6abd328e19c9.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on app start
    try {
      const savedUser = localStorage.getItem('discord_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Snow particle component
  function DotParticles() {
    const [dots, setDots] = useState([]);
    // Area just above 'For Players' (estimate 600px from top, adjust as needed)
    // Make particles appear right above 'For Players' heading
    const areaTop = 620; // px from top, just above 'For Players' section
    const areaHeight = 60; // smaller area for concentrated effect
    const areaBottom = areaTop + areaHeight;

    useEffect(() => {
      // Generate initial dots
      const initialDots = Array.from({ length: 50 }).map(() => {
        // Longer lifetime so particles disappear near heading
        const lifetime = Math.random() * 220 + 180;
        return {
          id: Math.random().toString(36).substr(2, 9),
          left: Math.random() * 100,
          size: Math.random() * 3 + 2,
          top: areaBottom,
          speed: Math.random() * 0.3 + 0.3,
          lifetime,
          age: Math.random() * lifetime, // random initial age
        };
      });
      setDots(initialDots);

      // Animate dots upward and respawn
      const interval = setInterval(() => {
        setDots(prev => prev.map(dot => {
          let newAge = dot.age + 1;
          let progress = newAge / dot.lifetime;
          let newTop = dot.top - dot.speed * 6;
          let opacity = progress < 0.1
            ? progress * 6.9 // fade in
            : progress > 0.85
              ? (1 - progress) * 6.9 // fade out to 0
              : 0.69;

          // Prevent despawn until dot reaches at least 100px from top and is fully transparent
          if ((progress >= 1 || newTop < 100) && opacity <= 0.01) {
            // Respawn dot at bottom
            return {
              ...dot,
              top: areaBottom,
              left: Math.random() * 100,
              size: Math.random() * 3 + 2,
              speed: Math.random() * 0.3 + 0.3,
              lifetime: Math.random() * 120 + 80,
              age: Math.random() * (Math.random() * 120 + 80), // random initial age
            };
          }

          return {
            ...dot,
            top: newTop,
            age: newAge,
            opacity,
          };
        }));
      }, 30);

      return () => clearInterval(interval);
    }, [areaBottom]);

    return (
      <div
        className="absolute left-0 w-full"
        style={{
          top: areaTop,
          height: areaHeight,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      >
        {dots.map(dot => (
          <span
            key={dot.id}
            className="dot-particle"
            style={{
              left: `${dot.left}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              top: `${dot.top - areaTop}px`,
              position: 'absolute',
              background: '#ffffff',
              borderRadius: '50%',
              opacity: dot.opacity,
              transition: 'opacity 0.1s',
            }}
          />
        ))}
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('discord_user');
    // Redirect to main page after logout
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Snow Particles */}
      <DotParticles />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <div className="text-2xl font-bold text-white">HEXRTBRXENCHROMAS</div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate('/explore')}
            className="text-white hover:text-red-400 transition-colors font-medium"
          >
            Explore Mods
          </button>
          <button 
            onClick={() => navigate('/install')}
            className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
          >
            Install Mods
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="text-white hover:text-red-400 transition-colors font-medium"
          >
            Create Mods
          </button>
          <button 
            onClick={() => navigate('/admin')}
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium flex items-center space-x-1"
          >
            <span>🛡️</span>
            <span>Admin</span>
          </button>
        </div>

        {/* User Account Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar_url} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">{user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/')}
              className="bg-transparent border border-white hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
            >
              Go to Login
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        {/* XDX watermarks */}
        <div className="absolute top-20 left-20 text-red-500 text-6xl font-bold opacity-20 transform -rotate-12">
          XDX
        </div>
        <div className="absolute top-32 right-32 text-red-500 text-4xl font-bold opacity-15 transform rotate-12">
          XDX
        </div>
        <div className="absolute bottom-40 left-32 text-red-500 text-5xl font-bold opacity-10 transform rotate-45">
          XDX
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
          HEXRTBRXEN CHROMAS
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl leading-relaxed">
          A website offering customizable League of Legends skins,<br />
          featuring high-quality visuals,<br />
          easy installation, and a growing library of unique fan-made<br />
          content.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6 mb-16">
          <button 
            onClick={() => navigate('/explore')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Explore Mods →
          </button>
          <button 
            onClick={() => navigate('/install')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Install Mods
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;