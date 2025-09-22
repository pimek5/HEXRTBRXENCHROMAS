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
      message: 'CLIENT_SECRET not configured'
    });
  }

  try {
    console.log('🔑 Exchanging code for token...');
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || 'https://pimek5.github.io/HEXRTBRXENCHROMAS/',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.log('❌ Token exchange failed:', tokenResponse.status, errorText);
      return res.status(400).json({ 
        error: 'Token exchange failed',
        details: errorText 
      });
    }

    const tokenData = await tokenResponse.json();
    console.log('✅ Token obtained successfully');

    // Get user data
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.log('❌ User data fetch failed:', userResponse.status, errorText);
      return res.status(400).json({ 
        error: 'Failed to get user data',
        details: errorText 
      });
    }

    const userData = await userResponse.json();
    console.log('✅ User data obtained:', userData.username);

    // Return user data
    return res.status(200).json({
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar,
      email: userData.email,
      verified: userData.verified
    });

  } catch (error) {
    console.log('❌ Discord OAuth error:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}