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
http.createServer((req, res) => {
    res.writeHead(200);
    res.end('LSC BOT działa!');
}).listen(process.env.PORT || 3000, () => {
    console.log('🌐 Render port działa!');
});


client.login(process.env.TOKEN);