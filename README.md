# HEXRTBRXENCHROMAS

Premium League of Legends Custom Skins & Mods platform with Discord OAuth authentication.

## Features

- 🎨 Custom skins for all League of Legends champions
- ✨ Exclusive chromas and color variations
- 🔐 Discord OAuth authentication
- 🚀 Easy one-click installation
- 🔒 Safe and undetectable modifications
- 👥 Active Discord community

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pimek5/HEXRTBRXENCHROMAS.git
   cd HEXRTBRXENCHROMAS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Fill in your Discord application credentials:
     ```
     DISCORD_CLIENT_ID=your_client_id_here
     DISCORD_CLIENT_SECRET=your_client_secret_here
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Run production server**
   ```bash
   npm start
   ```

## Deployment

### GitHub Pages (Frontend)
```bash
npm run deploy
```

### Railway (Backend)
1. Connect your repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

## Project Structure

```
├── public/
│   ├── auth/discord/callback.html  # OAuth callback handler
│   ├── index.html                  # Main HTML template
│   └── manifest.json              # PWA manifest
├── src/
│   ├── App.js                      # Main React component
│   ├── index.js                    # React entry point
│   └── index.css                   # Styles
├── server.js                       # Express backend server
├── package.json                    # Dependencies and scripts
├── nixpacks.toml                   # Railway build configuration
├── Procfile                        # Railway process definition
└── railway.json                    # Railway deployment config
```

## Discord OAuth Setup

1. Create a Discord application at https://discord.com/developers/applications
2. Add redirect URIs:
   - `http://localhost:3000` (development)
   - `https://pimek5.github.io/HEXRTBRXENCHROMAS/auth/discord/callback.html` (production)
3. Copy Client ID and Client Secret to your environment variables

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_CLIENT_ID` | Discord application client ID | Yes |
| `DISCORD_CLIENT_SECRET` | Discord application client secret | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |

## Scripts

- `npm run dev` - Start React development server
- `npm start` - Start production server (Express + React)
- `npm run build` - Build React app for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm test` - Run tests

## Live Deployment

- **Frontend**: https://pimek5.github.io/HEXRTBRXENCHROMAS
- **Backend**: https://radiant-integrity-production.up.railway.app

## Support

Join our Discord community for support and updates: [Discord Server Link]

## License

This project is for educational purposes only. All League of Legends assets belong to Riot Games.