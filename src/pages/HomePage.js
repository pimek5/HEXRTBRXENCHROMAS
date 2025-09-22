import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../bloom.css';
import logo from "../Download.png";
import bgImage from "../87febddd0466e384f137a6abd328e19c9.jpg";

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

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage
    try {
      const savedUser = localStorage.getItem('discord_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Discover Mods animation hooks
  const mods = [
    {
      img: "https://imgur.com/AOfBnKv.png",
      label: "Chibi Yuumi"
    },
    {
      img: "https://imgur.com/yVd5O7C.png",
      label: "Chibi Sona"
    },
    {
      img: "https://imgur.com/t4Qrca4.png",
      label: "Chibi Yuumi"
    },
    {
      img: "https://imgur.com/wPO8AkO.png",
      label: "Cinna Kassadin"
    },
    {
      img: "https://i.imgur.com/196HUSX.png",
      label: "Cosplay Fan Janna"
    },
    {
      img: "https://i.imgur.com/328gIKz.png",
      label: "Project: Twitch"
    }
  ];
  const [active, setActive] = useState(0);
  const modRefs = useRef([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % mods.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [mods.length]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('discord_user');
    navigate('/'); // Go back to main page
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)',
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

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

        {/* Account Info Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatar_url} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">Welcome, {user.username}!</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-gray-300">Guest User</span>
              <button 
                onClick={() => navigate('/')}
                className="bg-transparent border border-white hover:bg-white hover:text-black px-4 py-2 rounded transition-all"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-white leading-tight">
          HEXRTBRXENCHROMAS
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl leading-relaxed">
          A website offering customizable League of Legends skins, featuring high-quality visuals,<br />
          easy installation, and a growing library of unique fan-made content.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => navigate('/explore')}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Mods →
          </button>
          <button 
            onClick={() => navigate('/install')}
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Install Mods
          </button>
        </div>
      </div>

      {/* For Players Section */}
      <div className="relative z-40 py-20 px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">For Players</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Discover and install amazing custom skins created by the community. 
            Transform your League of Legends experience with high-quality visual modifications.
          </p>

          {/* Discover Mods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mods.map((mod, index) => (
              <div
                key={index}
                ref={el => modRefs.current[index] = el}
                className={`relative overflow-hidden rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  index === active ? 'ring-2 ring-red-500 shadow-red-500/50 scale-105' : ''
                }`}
                style={{
                  opacity: index === active ? 1 : 0.8,
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={mod.img}
                    alt={mod.label}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{mod.label}</h3>
                  <button 
                    onClick={() => navigate('/explore')}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button 
              onClick={() => navigate('/explore')}
              className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white px-16 py-5 rounded-xl text-2xl font-bold transition-all transform hover:scale-105 shadow-2xl"
            >
              Explore All Mods
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;