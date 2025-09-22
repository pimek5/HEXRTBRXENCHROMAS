const axios = require('axios');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('🚀 Vercel Discord OAuth endpoint hit');
  console.log('Method:', req.method);
  console.log('Query:', req.query);

  const { code, redirect_uri } = req.query;

  if (!code) {
    console.log('❌ No authorization code');
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const CLIENT_ID = '1274276113660645389';
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  if (!CLIENT_SECRET) {
    console.log('❌ No client secret configured');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'CLIENT_SECRET not configured on Vercel'
    });
  }

  try {
    console.log('🔄 Exchanging code for Discord token...');
    
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ Token received, fetching user data...');
    const { access_token, token_type } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `${token_type} ${access_token}`
      }
    });

    const user = userResponse.data;
    console.log('✅ User authenticated:', user.username + '#' + user.discriminator);

    // Return user data
    const userData = {
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      email: user.email,
      verified: user.verified,
      provider: 'discord-vercel'
    };

    res.json(userData);

  } catch (error) {
    console.error('❌ Discord OAuth error:', error.response?.data || error.message);
    
    res.status(500).json({
      error: 'Discord authentication failed',
      details: error.response?.data || error.message,
      provider: 'vercel'
    });
  }
}