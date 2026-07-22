require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

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


    console.log(
        `📌 Komenda: /${interaction.commandName} | Użytkownik: ${interaction.user.tag} (${interaction.user.id})`
    );


    const command = client.commands.get(interaction.commandName);


    if (!command) {

        return interaction.reply({
            content: '❌ Nie znaleziono tej komendy.',
            ephemeral: true
        });

    }


    try {

        await command.execute(interaction);

        console.log(`✅ Wykonano: /${interaction.commandName}`);


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

if (fs.existsSync(eventsPath)) {

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

function renderPing() {

    https.get(
        'https://lsc-bot-zb1p.onrender.com',
        (res) => {

            console.log(`🔄 Render ping: ${res.statusCode}`);

        }

    ).on('error', (err) => {

        console.log('❌ Render ping error:', err.message);

    });

}


console.log('⏰ Auto ping Render aktywny (co 5 minut)');


// pierwszy ping po starcie
renderPing();


// kolejne pingi co 5 minut
setInterval(renderPing, 5 * 60 * 1000);


// =======================
// START BOTA
// =======================

client.login(process.env.TOKEN);
