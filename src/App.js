import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
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
  }, []);

  // Exchange OAuth code for user token and data
  const exchangeCodeForToken = async (code) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Sending code to backend:', code);
      const response = await axios.post(`${BACKEND_URL}/api/auth/discord`, { 
        code,
        redirect_uri: REDIRECT_URI 
      });

      console.log('Backend response:', response.data);
      
      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('discordUser', JSON.stringify(response.data.user));
        console.log('User authenticated successfully:', response.data.user);
      } else {
        throw new Error('No user data received from backend');
      }
    } catch (error) {
      console.error('Token exchange error:', error);
      setError('Failed to authenticate with Discord: ' + (error.response?.data?.error || error.message));
      // Clear any invalid saved data
      localStorage.removeItem('discordUser');
    } finally {
      setLoading(false);
    }
  };

  // Initiate Discord OAuth login
  const loginWithDiscord = () => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
    
    console.log('Redirecting to Discord OAuth:', discordAuthUrl);
    window.location.href = discordAuthUrl;
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('discordUser');
    setError(null);
    console.log('User logged out');
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="title">HEXRTBRXENCHROMAS</h1>
        <p className="subtitle">Premium League of Legends Custom Skins & Mods</p>
      </header>

      <main className="content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {error && <div className="error">{error}</div>}
            
            <div className="login-section">
              {user ? (
                <div className="user-info">
                  <img 
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} 
                    alt="User Avatar" 
                    className="user-avatar"
                  />
                  <h2 className="user-name">Welcome, {user.username}!</h2>
                  <p className="user-id">Discord ID: {user.id}</p>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <h2>Access Premium Content</h2>
                  <p>Login with Discord to access exclusive custom skins and mods</p>
                  <button 
                    onClick={loginWithDiscord} 
                    className="discord-login-btn"
                    disabled={loading}
                  >
                    {loading ? 'Connecting...' : 'Login with Discord'}
                  </button>
                </div>
              )}
            </div>

            <section className="description">
              <h2>Transform Your League of Legends Experience</h2>
              <p>
                Discover the ultimate collection of custom skins, chromas, and visual enhancements 
                for League of Legends. Our meticulously crafted modifications bring new life to 
                your favorite champions with stunning visual effects and unique designs.
              </p>
            </section>

            <section className="features">
              <div className="feature-card">
                <h3 className="feature-title">🎨 Custom Skins</h3>
                <p className="feature-description">
                  High-quality custom skins for all champions with detailed textures and animations.
                  Each skin is carefully designed to maintain game performance while enhancing visuals.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">✨ Exclusive Chromas</h3>
                <p className="feature-description">
                  Unique color variations and special effects for existing skins. 
                  Transform your champion's appearance with our exclusive chroma collection.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">🔧 Easy Installation</h3>
                <p className="feature-description">
                  Simple one-click installation process with our custom launcher. 
                  No technical knowledge required - just download and play.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">🔒 Safe & Secure</h3>
                <p className="feature-description">
                  All modifications are client-side only and undetectable by anti-cheat systems. 
                  Your account safety is our top priority.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">🚀 Regular Updates</h3>
                <p className="feature-description">
                  Constant updates with new skins and compatibility patches for each League of Legends update. 
                  Stay current with the latest content.
                </p>
              </div>

              <div className="feature-card">
                <h3 className="feature-title">👥 Community</h3>
                <p className="feature-description">
                  Join our Discord community to share feedback, request custom skins, 
                  and connect with other League of Legends enthusiasts.
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;