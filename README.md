# Greenfield Life RP - Simple Server

This project is a minimal Node.js + static site starter for a roleplay (RP) server inspired by Greenfield (Roblox).

## What's included
- Express server (index.js)
- Static frontend under `public/`
- Sample data in `data/` (ministries.json)
- Simple API endpoints:
  - `GET /api/ministries`
  - `GET /api/ministries/:id`
  - `POST /api/auth/login`
  - `POST /api/report`
  - `GET /api/reports`
- `bot.js` placeholder for a bot

## How to run
1. Install dependencies:
   ```
   npm install
   ```
2. Start server:
   ```
   npm start
   ```
3. Open `http://localhost:3000/` in your browser.

## Notes
- This is a demo starter. Replace with a real database and secure auth for production.
