// ===== MODIFIED VERSION FOR RENDER =====
require('dotenv').config();
const { Client } = require('discord.js');
const express = require('express');

const TOKEN = process.env.DISCORD_TOKEN;

// Web server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Discord Bot is alive!');
});

app.listen(PORT, () => {
  console.log(`✅ Keep-alive server running on port ${PORT}`);
});

// Discord client - TEXT ONLY
const client = new Client({ 
    intents: 32767
});

console.log('🤖 Starting 24/7 Status Bot...');

client.once('ready', () => {
    console.log(`✅ ${client.user.username} ready!`);
    
    // Set status instead of joining voice
    client.user.setPresence({
        activities: [{ 
            name: '24/7 Online', 
            type: 3 // WATCHING
        }],
        status: 'online'
    });
    
    console.log('✅ Status set to "24/7 Online"');
});

// Keep the bot online with periodic status updates
setInterval(() => {
    if (client.user) {
        client.user.setActivity(`Uptime: ${Math.floor(process.uptime() / 60)}m`, { 
            type: 3 // WATCHING
        });
    }
}, 300000); // Update every 5 minutes

client.login(TOKEN).catch(console.error);
