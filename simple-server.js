const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Simple CORS for testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Discord OAuth configuration
const CLIENT_ID = '1274276113660645389';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

console.log('Starting server...');
console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET:', CLIENT_SECRET ? 'SET' : 'NOT SET');

// Health endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    client_secret_configured: !!CLIENT_SECRET,
    version: '2.0.0'
  });
});

// Simple test endpoint
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Discord OAuth endpoint
app.get('/api/auth/discord', async (req, res) => {
  console.log('Discord OAuth endpoint hit');
  console.log('Query params:', req.query);
  
  const { code, redirect_uri } = req.query;
  
  if (!code) {
    console.log('No code provided');
    return res.status(400).json({ error: 'No authorization code provided' });
  }
  
  if (!CLIENT_SECRET) {
    console.log('No client secret configured');
    return res.status(500).json({ error: 'Discord client secret not configured' });
  }
  
  try {
    console.log('Exchanging code for token...');
    
    // Exchange code for access token
    const tokenResponse = await axios.post('https://discord.com/api/v10/oauth2/token', 
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || 'https://pimek5.github.io/HEXRTBRXENCHROMAS/'
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    const { access_token, token_type } = tokenResponse.data;
    console.log('Token obtained, fetching user...');

    // Get user info
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { 'Authorization': `${token_type} ${access_token}` }
    });

    const user = userResponse.data;
    console.log('User fetched:', user.username);

    res.json({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      verified: user.verified
    });

  } catch (error) {
    console.error('Discord OAuth error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Discord authentication failed' });
  }
});

// Catch all
app.get('*', (req, res) => {
  console.log('404 for:', req.path);
  res.status(404).json({ error: 'Not found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
});