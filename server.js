require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());
const CLIENT_ID = '1274276113660645389';
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Discord app secret from environment variable
const REDIRECT_URI = 'https://la988z3j.up.railway.app/auth/discord/callback'; // Railway production callback

app.get('/auth/discord/callback', (req, res) => {
  res.send('Callback received. You can close this tab.');
});

app.get('/api/auth/discord', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'Missing code' });

  // Exchange code for access token
  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    })
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) return res.status(400).json({ error: 'Invalid token response' });

  // Fetch user info
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const userData = await userRes.json();
  res.json({
    username: userData.username,
    avatar: userData.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
      : 'https://cdn.discordapp.com/embed/avatars/0.png',
    id: userData.id
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
