import axios from 'axios';

export default async function handler(req, res) {
  // Ustawienia CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🔥 Vercel Discord OAuth - Request received');
  console.log('Query:', req.query);

  const { code, redirect_uri } = req.query;
  
  if (!code) {
    console.log('❌ Missing code');
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  const CLIENT_ID = '1274276113660645389';
  const CLIENT_SECRET = process.env.CLIENT_SECRET;

  if (!CLIENT_SECRET) {
    console.log('❌ Missing CLIENT_SECRET env var');
    return res.status(500).json({ 
      error: 'Server configuration error',
      env_check: 'CLIENT_SECRET not found'
    });
  }

  try {
    console.log('🔄 Exchanging code for token...');
    
    // Wymiana kodu na token
    const tokenResponse = await axios.post('https://discord.com/api/v10/oauth2/token', 
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || 'https://pimek5.github.io/HEXRTBRXENCHROMAS/'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ Token received');
    const { access_token, token_type } = tokenResponse.data;

    // Pobieranie danych użytkownika
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

    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ Discord OAuth error:', error.response?.data || error.message);
    
    return res.status(500).json({
      error: 'Discord authentication failed',
      details: error.response?.data || error.message,
      step: error.response ? 'discord_api_error' : 'network_error'
    });
  }
}