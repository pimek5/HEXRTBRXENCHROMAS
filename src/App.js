import React, { useState, useEffect, useRef } from "react";
import './bloom.css';
import logo from "./Download.png";
import bgImage from "./87febddd0466e384f137a6abd328e19c9.jpg";
import { FaTwitter, FaDiscord } from "react-icons/fa";

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
  }, []);
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

function App() {
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
  }, []);
  // User state for Discord login
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on app start
    try {
      const savedUser = localStorage.getItem('discord_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check for code in URL and fetch Discord user info
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (error) {
      setAuthError('Discord authorization was denied or failed.');
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    if (code && !user && !isLoading) {
      setIsLoading(true);
      setAuthError(null);

      // Exchange code for user info via Railway backend
      fetch(`https://radiant-integrity-production.up.railway.app/api/auth/discord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: window.location.hostname === "localhost"
            ? "http://localhost:3000/auth/discord/callback"
            : "https://pimek5.github.io/HEXRTBRXENCHROMAS/auth/discord/callback.html"
        })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
          setUser(data);
          localStorage.setItem('discord_user', JSON.stringify(data));
          setAuthError(null);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(error => {
          console.error('Discord auth error:', error);
          setAuthError('Failed to authenticate with Discord. Please try again.');
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, isLoading]);

  return (
      <>
  <div className="relative bg-[#0d0c0f] text-white min-h-screen w-full overflow-hidden">
          {/* Background image above black, behind all content */}
          {/* Background image covers entire viewport with gradient overlay */}
          {/* Move background image above black section, with gradient overlay */}
          <div className="absolute inset-0 w-full h-full" style={{zIndex: 0, top: 0, left: 0}}>
            <img src={bgImage} alt="background" className="w-full h-full object-cover" style={{opacity: 0.7, width: '100vw', height: '100vh', zIndex: 0}} />   
            {/* Gradient overlay removed as requested */}
            {/* Blurred color overlay moved above 'For Players' */}
            <div className="absolute w-full h-32" style={{
              top: '580px', // Move gradient lower, just above 'For Players'
              background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 0,
            }} />
          </div>
          {/* Removed duplicate image rendering to prevent overlap */}
          {/* Top Navigation & Hero Section */}
          <header className="relative w-full" style={{minHeight: '100vh'}}>
            {/* Top bar layout: logo left, nav center, login right */}
            <div className="flex items-center justify-between w-full px-8 pt-6" style={{position: 'relative', zIndex: 20}}>
              <div className="logo-group">
                <img src={logo} alt="Logo" className="w-24 h-24 rounded-full object-cover logo" />
                <div className="icon-row">
                    <a href="https://twitter.com/p1mek" target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="text-blue-400 text-3xl mx-2 twitter-icon" />
                    </a>
                  <a href="https://discord.gg/hexrtbrxenchromas" target="_blank" rel="noopener noreferrer">
                    <FaDiscord className="text-indigo-400 text-3xl mx-2 discord-icon" />
                  </a>
                </div>
              </div>
              <nav className="flex space-x-12 text-lg font-medium">
                <a href="#explore" className="text-gray-300 hover:text-white bloom">Explore Mods</a>
                <a href="#install" className="text-yellow-400 font-semibold bloom">Install Mods</a>
                <a href="#create" className="text-gray-300 hover:text-white bloom">Create Mods</a>
              </nav>
              {user ? (
                <div className="relative">
                  <button
                    className="flex items-center px-4 py-2 rounded bg-[#2a2833] text-white font-medium bloom"
                    onClick={() => setDropdownOpen(v => !v)}
                  >
                    <img src={user.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                    {user.username}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#18171c] rounded shadow-lg z-50">
                      <button className="block w-full text-left px-4 py-2 hover:bg-[#23222a]" onClick={() => alert('Settings coming soon!')}>Settings</button> 
                      <button className="block w-full text-left px-4 py-2 hover:bg-[#23222a]" onClick={() => {
                        setUser(null);
                        setDropdownOpen(false);
                        setAuthError(null);
                        localStorage.removeItem('discord_user');
                      }}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-end">
                  <button
                    className="px-6 py-2 rounded bg-[#2a2833] text-white font-medium bloom disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={() => {
                      setAuthError(null);
                      const isLocal = window.location.hostname === "localhost";
                      const redirectUri = isLocal
                        ? "http://localhost:3000/auth/discord/callback"
                        : "https://pimek5.github.io/HEXRTBRXENCHROMAS/auth/discord/callback.html";
                      const clientId = process.env.REACT_APP_CLIENT_ID || '1274276113660645389';
                      const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
                      window.location.href = oauthUrl;
                    }}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                  {authError && (
                    <div className="mt-2 text-red-400 text-sm max-w-48 text-right">
                      {authError}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* All content above background layers */}
            <div style={{position: 'relative', zIndex: 100}}>
              <DotParticles />
              <div className="flex flex-col items-center justify-center w-full" style={{marginTop: '6rem'}}>
                <h1 className="text-7xl font-bold mt-12 mb-4 text-white bloom" style={{letterSpacing: '0.04em'}}>HEXRTBRXEN CHROMAS</h1>
                <p className="mt-2 text-2xl text-gray-400 max-w-2xl text-center font-normal bloom">
                  A website offering customizable League of Legends skins, featuring high-quality visuals,<br />easy installation, and a growing library of unique fan-made content.
                </p>
                <div className="flex space-x-6 mt-10 justify-center">
                  <button
                    className="px-8 py-4 rounded text-white font-semibold text-xl transition bloom"
                    style={{
                      zIndex: 100,
                      position: 'relative',
                      background: 'linear-gradient(90deg, rgba(255,0,0,0.8) 0%, #1a181c 100%)',
                      border: 'none',
                    }}
                  >Explore Mods →</button>
                  <button
                    className="px-8 py-4 bg-[#222] rounded text-white font-semibold text-xl hover:bg-[#333] transition bloom"
                    style={{zIndex: 100, position: 'relative'}}
                  >Install Mods</button>
                </div>
              </div>
            </div>
          </header>

      {/* Features Section 1: For Players */}
      <section className="py-16 relative" id="explore">
        <div className="flex justify-end mb-4 px-8">
          <button
            className="bg-red-700 text-white px-4 py-2 rounded font-bold hover:bg-red-800 transition"
            onClick={() => window.location.reload()}
          >
            Update
          </button>
        </div>
        {/* Removed duplicate section background image and gradient as requested */}
        <h2 className="text-4xl font-extrabold text-center mb-8">For Players</h2>
        <p className="text-center text-gray-300 mb-12 text-lg">Join thousands of creators and players who are revolutionizing the League of Legends experience with custom skins.</p>
        <div className="flex flex-wrap justify-center gap-12 px-4">
          {/* Discover Mods Card */}
          <div className="bg-[#18161c] rounded-2xl p-10 w-full max-w-lg flex flex-col mb-8 shadow-xl relative">
            <h3 className="text-2xl font-bold mb-2">Discover over 999+ mods</h3>
            <p className="text-gray-400 mb-4 text-sm">Find the content you need to take your gameplay to the next level.</p>
            <div className="bg-[#222] rounded-lg p-3 mb-2">
              <input type="text" placeholder="Search mods..." className="w-full px-3 py-2 rounded bg-[#18161c] text-white text-sm mb-3 outline-none" />
              <div className="space-y-2 relative" style={{ minHeight: '420px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: (() => {
                      const el = modRefs.current[active];
                      const parent = el?.parentNode;
                      if (el && parent) {
                        const elRect = el.getBoundingClientRect();
                        const parentRect = parent.getBoundingClientRect();
                        return elRect.top - parentRect.top;
                      }
                      return 0;
                    })(),
                    width: '100%',
                    height: modRefs.current[active]?.offsetHeight ?? 64,
                    background: 'linear-gradient(90deg, #b91c1c33 0%, #b91c1c11 100%)',
                    borderRadius: '12px',
                    transition: 'top 0.4s cubic-bezier(.4,2,.3,1), height 0.4s cubic-bezier(.4,2,.3,1)',
                    zIndex: 0
                  }}
                />
                {mods.map((mod, idx) => (
                  <div
                    key={mod.label + idx}
                    ref={el => modRefs.current[idx] = el}
                    className={`flex items-center bg-[#18161c] rounded px-2 py-2 cursor-pointer ${active === idx ? 'border-2 border-red-700' : ''}`}
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <img src={mod.img} alt={mod.label} className="w-14 h-14 rounded-full mr-4 object-cover" style={mod.label === 'Cosplay Fan Janna' ? {objectPosition: 'center 30%'} : {}} />
                    <div>
                      <span className="font-bold text-white text-lg">{mod.label}</span>
                      <div className="text-xs text-gray-400">Custom skin + Hud + Voicelines</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Follow Project Card */}
          <div className="bg-[#18161c] rounded-2xl p-10 w-full max-w-lg flex flex-col mb-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-2 text-red-200">Follow your Favourite Project</h3>
            <p className="text-gray-400 mb-4 text-sm">Stay in the loop—get notified whenever your favorite projects receive updates.</p>
            <div className="space-y-2">
              <div className="flex items-center bg-[#222] rounded-lg px-3 py-2 justify-between">
                <div className="flex items-center">
                  <img src="/static/media/Home_Frieren.svg" alt="LeBlanc Kostumler" className="w-8 h-8 rounded-full mr-2" />
                  <span className="font-bold text-white text-sm">LeBlanc Kostumler</span>
                </div>
                <button className="bg-red-700 text-white text-xs px-3 py-1 rounded">Update</button>
              </div>
              <div className="flex items-center bg-[#222] rounded-lg px-3 py-2 justify-between">
                <span className="font-bold text-white text-sm">Anti Kostumler</span>
                <button className="bg-red-700 text-white text-xs px-3 py-1 rounded">Update</button>
              </div>
              <div className="flex items-center bg-[#222] rounded-lg px-3 py-2 justify-between">
                <span className="font-bold text-white text-sm">Akari Kostumler</span>
                <button className="bg-red-700 text-white text-xs px-3 py-1 rounded">Update</button>
              </div>
            </div>
          </div>

          {/* Launcher Card */}
          <div className="bg-[#18161c] rounded-2xl p-10 w-full max-w-lg flex flex-col mb-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-2 text-red-200">Play with your favourite launcher</h3>
            <p className="text-gray-400 mb-4 text-sm">Automatically install hundreds of mods with just a few clicks.</p>
            <div className="bg-[#222] rounded-lg p-3 mb-2">
              <div className="flex items-center mb-2">
                <span className="text-xs text-gray-400">Celestial Launcher</span>
              </div>
              <div className="grid grid-cols-5 gap-1 mb-2">
                <img src="/static/media/Home_Frieren.svg" alt="mod1" className="w-8 h-8 rounded" />
                <img src="/static/media/Home_Nagi.svg" alt="mod2" className="w-8 h-8 rounded" />
                <img src="/static/media/Home_Sung.svg" alt="mod3" className="w-8 h-8 rounded" />
                <img src="/static/media/Home_Rem.svg" alt="mod4" className="w-8 h-8 rounded" />
                <img src="/static/media/Home_Gojo.svg" alt="mod5" className="w-8 h-8 rounded" />
              </div>
              <button className="w-full bg-red-700 text-white py-2 rounded font-semibold">Install</button>
            </div>
          </div>

          {/* Broken Mods Card */}
          <div className="bg-[#18161c] rounded-2xl p-12 w-full max-w-2xl flex flex-col mb-8 col-span-2 shadow-xl">
            <h3 className="text-2xl font-bold mb-2 text-red-200">No more BROKEN Mods</h3>
            <p className="text-gray-400 mb-4 text-sm">All mods are regularly maintained and updated after every game patch.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-700 px-2 py-1 rounded text-xs text-white">Updated</span>
              <span className="bg-green-700 px-2 py-1 rounded text-xs text-white">Compatible</span>
              <span className="bg-green-700 px-2 py-1 rounded text-xs text-white">Working</span>
              <span className="bg-red-700 px-2 py-1 rounded text-xs text-white">Patch 25.11 Ready</span>
              <span className="bg-red-700 px-2 py-1 rounded text-xs text-white">99.9% Uptime</span>
            </div>
            <div className="flex items-center justify-between bg-[#222] rounded-lg p-4">
              <div className="flex flex-col items-center">
                <span className="bg-red-700 px-2 py-1 rounded text-xs mb-2 text-white">New Patch</span>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-red-700 px-2 py-1 rounded text-xs mb-2 text-white">Fix by Creator</span>
                <span className="text-gray-400">→</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="bg-red-700 px-2 py-1 rounded text-xs mb-2 text-white">Celestial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Features Section 2: For Modders */}
          <section className="py-16" id="create">
            <h2 className="text-2xl font-bold text-center mb-4">For Modders</h2>
            <p className="text-center text-gray-300 mb-8">Our platform makes it easy to create, share, and discover custom League of Legends skins in just a few simple steps.</p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="bg-[#18161c] rounded-lg p-6 w-80 flex flex-col items-center">
                <span style={{color: '#FF0000'}} className="text-2xl mb-2">🛠️</span>
                <h3 className="text-lg font-semibold mb-2">Create</h3>
                <p className="text-gray-400 text-center">Design your custom skin using our comprehensive guidelines and tools. Upload your creation to our platform.</p>
              </div>
              <div className="bg-[#18161c] rounded-lg p-6 w-80 flex flex-col items-center">
                <span style={{color: '#FF0000'}} className="text-2xl mb-2">�</span>
                <h3 className="text-lg font-semibold mb-2">Share</h3>
                <p className="text-gray-400 text-center">Share your skin with our community. Get feedback, make improvements, and build your reputation.</p>
              </div>
              <div className="bg-[#18161c] rounded-lg p-6 w-80 flex flex-col items-center">
                <span style={{color: '#FF0000'}} className="text-2xl mb-2">💰</span>
                <h3 className="text-lg font-semibold mb-2">Monetization</h3>
                <p className="text-gray-400 text-center">Earn ad revenue from your projects and withdraw funds whenever you like.</p>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section className="py-16">
            <h2 className="text-2xl font-bold mb-4">Recent News</h2>
            <div className="flex justify-between items-center mb-8">
              <span></span>
              <a href="#" className="text-white font-semibold">View All →</a>
            </div>
            <div className="bg-[#18161c] rounded-lg p-8 text-center">
              <p className="text-gray-400">No recent posts</p>
              <p className="text-xs text-gray-500">Check back later for new content</p>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="bg-[#18161c] py-12 mt-16">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
              <div className="bg-red-700 w-full rounded-lg p-8 flex flex-col md:flex-row items-center justify-between mb-8 relative overflow-hidden">
                {/* Background image fills the purple area */}
                <img src={bgImage} alt="feature" className="absolute inset-0 w-full h-full object-cover z-0" style={{opacity: 0.45, filter: 'brightness(0.7)'}} />
                <div className="relative z-10 w-full flex md:flex-row flex-col items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">High-Quality Custom Skins Made With Love</h3>
                    <p className="text-lg text-gray-200 mb-4">Download Celestial Launcher Now!</p>
                    <button className="px-6 py-3 bg-white rounded font-semibold" style={{color: '#FF0000'}}>Get Started</button>
                  </div>
                  <img src={logo} alt="Logo" className="w-32 h-32 rounded-full object-cover shadow-lg mt-4 md:mt-0" />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between w-full mt-8">
                <div className="flex flex-col items-center md:items-start">
                  <img src={logo} alt="Logo" className="w-20 h-20 mb-2 rounded-full object-cover" />
                  <span style={{color: '#FF0000'}} className="font-bold text-lg">HEXRTBRXENCHROMAS</span>
                  <p className="text-xs text-gray-400 max-w-xs mt-2">HEXRTBRXENCHROMAS is not affiliated with any games or game companies. Use of any third-party trademarks and content is for reference only. All trademarks and copyrights are property of their respective owners.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-16 mt-8 md:mt-0">
                  <div>
                    <h4 className="font-bold mb-2">About</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Blogs & News</li>
                      <li>Report issues</li>
                      <li>Monetization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Products</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>HEXRT+</li>
                      <li>Celestial App</li>
                      <li>Creators Wiki</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Legal</h4>
                    <ul className="text-gray-400 space-y-1 text-sm">
                      <li>Content Rules</li>
                      <li>Terms of Service</li>
                      <li>Privacy Policy</li>
                      <li>DMCA Policy</li>
                      <li>California Privacy</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-6 mt-8">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📱</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">🎤</a>
              </div>
              <p className="text-xs text-gray-500 mt-8">© HEXRTBRXENCHROMAS 2025. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </>
    );
}

export default App;