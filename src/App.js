import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './bloom.css';
import logo from "./Download.png";
import bgImage from "./87febddd0466e384f137a6abd328e19c9.jpg";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import ExploreMods from "./pages/ExploreMods";
import InstallMods from "./pages/InstallMods";
import CreateMods from "./pages/CreateMods";
import LoginPage from "./pages/LoginPage";
import PostMod from "./pages/PostMod";
import ModDetailPage from "./pages/ModDetailPage";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import RoleBadge from "./components/RoleBadge";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

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
  return (
    <AuthProvider>
      <Router basename="/HEXRTBRXENCHROMAS">
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
  const [selectedMod, setSelectedMod] = useState(null);
  const [userMods, setUserMods] = useState([]);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Check for code in URL and fetch user info
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

      // Determine redirect URI
      const isLocal = window.location.hostname === "localhost";
      const redirectUri = isLocal
        ? "http://localhost:3000/"
        : "https://pimek5.github.io/HEXRTBRXENCHROMAS/";

      // Try multiple backend services for reliability
      const backendUrls = [
        `https://my-2l8hpbka9-pimek5s-projects.vercel.app/api/discord-auth?code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
      ];

      console.log('Discord OAuth - trying multiple backends...');
      
      const tryBackends = async () => {
        let lastError;
        
        for (let i = 0; i < backendUrls.length; i++) {
          const url = backendUrls[i];
          const serviceName = url.includes('railway') ? 'Railway' : 'Vercel';
          
          try {
            console.log(`🔄 Trying ${serviceName}: ${url}`);
            
            const response = await fetch(url);
            console.log(`${serviceName} response status:`, response.status);
            
            if (response.ok) {
              const userData = await response.json();
              console.log(`✅ ${serviceName} success! User:`, userData.username);
              return userData;
            } else {
              const errorText = await response.text();
              console.log(`❌ ${serviceName} failed:`, response.status, errorText);
              lastError = new Error(`${serviceName} failed: ${response.status}`);
            }
          } catch (error) {
            console.log(`❌ ${serviceName} error:`, error.message);
            lastError = error;
          }
        }
        
        throw lastError || new Error('All backends failed');
      };

      tryBackends()
        .then(userData => {
          console.log('Discord OAuth SUCCESS! User data:', userData);
          
          // Store real Discord user data
          setUser(userData);
          localStorage.setItem('discord_user', JSON.stringify(userData));
          setAuthError(null);
          window.history.replaceState({}, document.title, window.location.pathname);
          
          console.log(`✅ User logged in: ${userData.username}#${userData.discriminator}`);
        })
        .catch(error => {
          console.error('Discord OAuth error:', error);
          setAuthError(`Discord login failed: ${error.message}`);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, isLoading]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/explore" element={
          <ExploreMods 
            onNavigate={(page, mod) => {
              if (mod) setSelectedMod(mod);
              if (page === 'modDetail') {
                navigate('/mod-detail');
              } else if (page === 'home') {
                navigate('/homepage');
              } else {
                navigate(`/${page}`);
              }
            }}
            userMods={userMods}
          />
        } />
        <Route path="/install" element={
          <InstallMods 
            onNavigate={(page) => page === 'home' ? navigate('/homepage') : navigate(`/${page}`)}
          />
        } />
        <Route path="/create" element={
          <CreateMods 
            onNavigate={(page) => page === 'home' ? navigate('/homepage') : navigate(`/${page}`)}
          />
        } />
        <Route path="/login" element={
          <LoginPage 
            onNavigate={(page) => page === 'home' ? navigate('/homepage') : navigate(`/${page}`)}
          />
        } />
        <Route path="/post" element={
          <PostMod 
            onBackToHome={() => navigate('/homepage')}
            onSubmitMod={(newMod) => {
              setUserMods(prev => [newMod, ...prev]);
              navigate('/explore');
            }}
          />
        } />
        <Route path="/mod-detail" element={
          <ModDetailPage 
            mod={selectedMod}
            onBackToExplore={() => navigate('/explore')}
            onLike={(modId, liked) => {
              console.log('Liked mod:', modId, liked);
            }}
            onComment={(modId, comment) => {
              console.log('New comment:', modId, comment);
            }}
          />
        } />
        <Route path="/admin" element={
          isAuthenticated ? (
            <AdminPanel 
              onNavigate={(page) => page === 'home' ? navigate('/homepage') : navigate(`/${page}`)}
            />
          ) : (
            <div style={{
              minHeight: '100vh',
              backgroundColor: '#0f0f0f',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Access Denied</h2>
                <p style={{ color: '#9CA3AF', marginBottom: '2rem' }}>
                  You need to be logged in as an administrator to access this page.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => setShowAdminLogin(true)}
                    style={{
                      backgroundColor: '#3B82F6',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🛡️ Admin Login
                  </button>
                  <button
                    onClick={() => navigate('/homepage')}
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </div>
          )
        } />
      </Routes>
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </>
  );
}

export default App;