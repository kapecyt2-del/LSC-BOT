require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Ładowanie eventów
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

    const event = require(path.join(eventsPath, file));

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }

}

// Serwer dla Rendera
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('LSC BOT działa!');
}).listen(PORT, () => {
    console.log('🌐 Render port działa!');
});


// Auto ping Render co 5 minut
setInterval(() => {

    http.get('https://lsc-bot-zb1p.onrender.com', (res) => {
        console.log(`🔄 Render ping: ${res.statusCode}`);
    }).on('error', (err) => {
        console.log('❌ Render ping error:', err.message);
    });

}, 5 * 60 * 1000);


// Start bota
client.login(process.env.TOKEN);