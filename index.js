require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();


// =======================
// ŁADOWANIE KOMEND
// =======================

const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {

    const commandFiles = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const command = require(path.join(commandsPath, file));

        client.commands.set(command.data.name, command);

        console.log(`✅ Załadowano komendę: ${command.data.name}`);
    }

}


// =======================
// OBSŁUGA SLASH KOMEND
// =======================

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return interaction.reply({
            content: '❌ Nie znaleziono tej komendy.',
            ephemeral: true
        });
    }


    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        if (interaction.replied || interaction.deferred) {

            await interaction.followUp({
                content: '❌ Wystąpił błąd podczas wykonywania komendy.',
                ephemeral: true
            });

        } else {

            await interaction.reply({
                content: '❌ Wystąpił błąd podczas wykonywania komendy.',
                ephemeral: true
            });

        }

    }

});


// =======================
// ŁADOWANIE EVENTÓW
// =======================

const eventsPath = path.join(__dirname, 'events');

const eventFiles = fs.readdirSync(eventsPath)
    .filter(file => file.endsWith('.js'));


for (const file of eventFiles) {

    const event = require(path.join(eventsPath, file));


    if (event.once) {

        client.once(
            event.name,
            (...args) => event.execute(...args, client)
        );

    } else {

        client.on(
            event.name,
            (...args) => event.execute(...args, client)
        );

    }

}


// =======================
// RENDER WEB SERVER
// =======================

const PORT = process.env.PORT || 3000;


http.createServer((req, res) => {

    res.writeHead(200);

    res.end('LSC BOT działa!');

}).listen(PORT, () => {

    console.log('🌐 Render port działa!');

});


// =======================
// AUTO PING RENDER
// =======================

setInterval(() => {

    http.get(
        'https://lsc-bot-zb1p.onrender.com',
        (res) => {

            console.log(`🔄 Render ping: ${res.statusCode}`);

        }

    ).on('error', (err) => {

        console.log('❌ Render ping error:', err.message);

    });

}, 5 * 60 * 1000);


// =======================
// START BOTA
// =======================

client.login(process.env.TOKEN);