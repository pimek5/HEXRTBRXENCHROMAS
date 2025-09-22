const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🚀 Discord OAuth Server Starting...');
console.log('PORT:', PORT);

// Enable CORS for all origins
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Discord configuration
const CLIENT_ID = '1274276113660645389';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET configured:', !!CLIENT_SECRET);

// Root route
app.get('/', (req, res) => {
  res.json({
    service: 'Discord OAuth Server',
    status: 'running',
    version: '5.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    client_secret: !!CLIENT_SECRET,
    timestamp: new Date().toISOString()
  });
});

// Discord OAuth endpoint
app.get('/api/auth/discord', async (req, res) => {
  console.log('📞 Discord OAuth request received');
  console.log('Query params:', req.query);
  console.log('Headers:', req.headers);
  
  const { code, redirect_uri } = req.query;
  
  if (!code) {
    console.log('❌ Missing authorization code');
    return res.status(400).json({ error: 'Missing authorization code' });
  }
  
  if (!CLIENT_SECRET) {
    console.log('❌ Missing client secret');
    console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('CLIENT')));
    return res.status(500).json({ 
      error: 'Server configuration error - missing CLIENT_SECRET',
      available_env: Object.keys(process.env).filter(key => key.includes('CLIENT'))
    });
  }
  
  try {
    console.log('🔄 Exchanging code for token...');
    console.log('Using CLIENT_ID:', CLIENT_ID);
    console.log('Using redirect_uri:', redirect_uri || 'https://pimek5.github.io/HEXRTBRXENCHROMAS/');
    
    const tokenPayload = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri || 'https://pimek5.github.io/HEXRTBRXENCHROMAS/'
    };
    
    console.log('Token payload:', { ...tokenPayload, client_secret: '[HIDDEN]' });
    
    const tokenResponse = await axios.post('https://discord.com/api/v10/oauth2/token', 
      new URLSearchParams(tokenPayload), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('✅ Token received, status:', tokenResponse.status);
    const { access_token, token_type } = tokenResponse.data;
    
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `${token_type} ${access_token}`
      }
    });
    
    const user = userResponse.data;
    console.log('✅ User authenticated:', user.username, '#' + user.discriminator);
    
    const response = {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      verified: user.verified
    };
    
    console.log('📤 Sending user data to frontend');
    res.json(response);
    
  } catch (error) {
    console.error('❌ OAuth error:', error.response?.data || error.message);
    console.error('Full error:', error);
    
    res.status(500).json({
      error: 'Authentication failed',
      details: error.response?.data || error.message,
      step: error.response ? 'discord_api' : 'network'
    });
  }
});

// Catch-all for unknown routes
app.use((req, res) => {
  console.log('⚠️  Unknown route:', req.method, req.path);
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Server running on http://0.0.0.0:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('   GET / - Service info');
  console.log('   GET /health - Health check');
  console.log('   GET /api/auth/discord - Discord OAuth');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    discord_client_configured: !!DISCORD_CLIENT_SECRET,
    version: '1.0.2'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    env_check: {
      client_id: !!DISCORD_CLIENT_ID,
      client_secret: !!DISCORD_CLIENT_SECRET
    }
  });
});

// Discord OAuth token exchange endpoint (GET method for compatibility)
app.get('/api/auth/discord', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { code } = req.query;
    const redirect_uri = req.query.redirect_uri || 'https://pimek5.github.io/HEXRTBRXENCHROMAS/';
    
    console.log('🔧 Environment check:');
    console.log(`  CLIENT_ID: ${DISCORD_CLIENT_ID ? 'SET' : 'NOT SET'}`);
    console.log(`  CLIENT_SECRET: ${DISCORD_CLIENT_SECRET ? 'SET' : 'NOT SET'}`);
    
    // Validate request
    if (!code) {
      console.error('❌ No authorization code provided');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    if (!DISCORD_CLIENT_SECRET) {
      console.error('❌ Discord client secret not configured');
      return res.status(500).json({ error: 'Discord client secret not configured' });
    }

    console.log(`🔄 Processing Discord OAuth for redirect URI: ${redirect_uri}`);
    console.log(`🔄 Authorization code: ${code.substring(0, 10)}...`);

    // Exchange code for access token
    console.log('📡 Exchanging code for access token...');
    const tokenResponse = await axios.post(`${DISCORD_API_BASE}/oauth2/token`, 
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
      }
    );

    const { access_token, token_type } = tokenResponse.data;
    console.log(`✅ Access token obtained: ${access_token.substring(0, 10)}...`);

    // Fetch user information
    console.log('👤 Fetching user information...');
    const userResponse = await axios.get(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        'Authorization': `${token_type} ${access_token}`
      },
      timeout: 10000
    });

    const user = userResponse.data;
    console.log(`✅ User authenticated: ${user.username}#${user.discriminator} (ID: ${user.id})`);

    // Return user data (same format as localStorage expects)
    const processingTime = Date.now() - startTime;
    res.json({ 
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      verified: user.verified,
      processing_time_ms: processingTime
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Discord OAuth error:', error.message);
    
    if (error.response) {
      console.error('Discord API Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
      
      if (error.response.status === 400 && error.response.data?.error === 'invalid_grant') {
        return res.status(400).json({ 
          error: 'Invalid or expired authorization code. Please try logging in again.',
          processing_time_ms: processingTime
        });
      }
      
      return res.status(error.response.status).json({ 
        error: error.response.data?.error_description || error.response.data?.error || 'Discord API error',
        processing_time_ms: processingTime
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ 
        error: 'Request timeout. Please try again.',
        processing_time_ms: processingTime
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error during Discord authentication',
      processing_time_ms: processingTime
    });
  }
});

// Discord OAuth token exchange endpoint
app.post('/api/auth/discord', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { code, redirect_uri } = req.body;
    
    // Validate request
    if (!code) {
      console.error('❌ No authorization code provided');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    if (!redirect_uri) {
      console.error('❌ No redirect URI provided');
      return res.status(400).json({ error: 'Redirect URI is required' });
    }

    if (!DISCORD_CLIENT_SECRET) {
      console.error('❌ Discord client secret not configured');
      return res.status(500).json({ error: 'Discord client secret not configured' });
    }

    console.log(`🔄 Processing Discord OAuth for redirect URI: ${redirect_uri}`);
    console.log(`🔄 Authorization code: ${code.substring(0, 10)}...`);

    // Exchange code for access token
    console.log('📡 Exchanging code for access token...');
    const tokenResponse = await axios.post(`${DISCORD_API_BASE}/oauth2/token`, 
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 10000
      }
    );

    const { access_token, token_type } = tokenResponse.data;
    console.log(`✅ Access token obtained: ${access_token.substring(0, 10)}...`);

    // Fetch user information
    console.log('👤 Fetching user information...');
    const userResponse = await axios.get(`${DISCORD_API_BASE}/users/@me`, {
      headers: {
        'Authorization': `${token_type} ${access_token}`
      },
      timeout: 10000
    });

    const user = userResponse.data;
    console.log(`✅ User authenticated: ${user.username}#${user.discriminator} (ID: ${user.id})`);

    // Return user data
    const processingTime = Date.now() - startTime;
    res.json({ 
      user: {
        id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        email: user.email,
        verified: user.verified
      },
      processing_time_ms: processingTime
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Discord OAuth error:', error.message);
    
    if (error.response) {
      console.error('Discord API Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
      
      // Handle specific Discord API errors
      if (error.response.status === 400 && error.response.data?.error === 'invalid_grant') {
        return res.status(400).json({ 
          error: 'Invalid or expired authorization code. Please try logging in again.',
          processing_time_ms: processingTime
        });
      }
      
      return res.status(error.response.status).json({ 
        error: error.response.data?.error_description || error.response.data?.error || 'Discord API error',
        processing_time_ms: processingTime
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ 
        error: 'Request timeout. Please try again.',
        processing_time_ms: processingTime
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error during Discord authentication',
      processing_time_ms: processingTime
    });
  }
});

// Discord OAuth callback redirect handler
app.get('/auth/discord/callback', (req, res) => {
  const { code, error, error_description } = req.query;
  
  if (error) {
    console.error('❌ Discord OAuth error:', error, error_description);
    return res.redirect(`/?error=${encodeURIComponent(error_description || error)}`);
  }
  
  if (code) {
    console.log('🔄 Redirecting with authorization code to frontend');
    return res.redirect(`/?code=${code}`);
  }
  
  console.error('❌ No code or error in callback');
  res.redirect('/?error=invalid_callback');
});

// API route not found handler
app.use('/api/*', (req, res) => {
  console.log(`❌ API route not found: ${req.method} ${req.path}`);
  res.status(404).json({ error: `API endpoint not found: ${req.path}` });
});

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 Discord Client ID: ${CLIENT_ID}`);
  console.log(`🔐 Discord Client Secret: ${CLIENT_SECRET ? 'configured' : 'NOT CONFIGURED'}`);
  
  if (!CLIENT_SECRET) {
    console.warn('⚠️  Warning: Discord Client Secret not set. OAuth will not work.');
    console.log('   Set CLIENT_SECRET environment variable to enable authentication.');
  }
  
  // Log registered routes
  console.log('📍 Registered routes:');
  console.log('   GET /health');
  console.log('   GET /api/test');
  console.log('   GET /api/auth/discord');
  console.log('   POST /api/auth/discord');
});