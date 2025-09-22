const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://pimek5.github.io'
  ],
  credentials: true
}));
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Environment validation
const requiredEnvVars = ['CLIENT_ID', 'CLIENT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.log('Please set the following environment variables:');
  missingEnvVars.forEach(varName => {
    console.log(`  ${varName}=your_${varName.toLowerCase()}_here`);
  });
} else {
  console.log('✅ All required environment variables are set');
}

// Discord OAuth configuration
const DISCORD_CLIENT_ID = process.env.CLIENT_ID || '1274276113660645389';
const DISCORD_CLIENT_SECRET = process.env.CLIENT_SECRET;
const DISCORD_API_BASE = 'https://discord.com/api/v10';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    discord_client_configured: !!DISCORD_CLIENT_SECRET
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
  console.log(`🔧 Discord Client ID: ${DISCORD_CLIENT_ID}`);
  console.log(`🔐 Discord Client Secret: ${DISCORD_CLIENT_SECRET ? 'configured' : 'NOT CONFIGURED'}`);
  
  if (!DISCORD_CLIENT_SECRET) {
    console.warn('⚠️  Warning: Discord Client Secret not set. OAuth will not work.');
    console.log('   Set DISCORD_CLIENT_SECRET environment variable to enable authentication.');
  }
});