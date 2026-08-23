require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const { Client, GatewayIntentBits, Collection } = require('discord.js');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
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

        console.log(`📂 Ładowanie eventu: ${file}`);

        const event = require(path.join(eventsPath, file));


        console.log(`✅ Załadowano event: ${event.name}`);


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

    console.log(`🌐 Wejście HTTP: ${req.method} ${req.url}`);

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


renderPing();


setInterval(renderPing, 5 * 60 * 1000);


// =======================
// FAKE SYSTEM DIAGNOSTICS
// =======================

function fakeSystemLogs() {

    const now = () => new Date().toISOString();

    console.log('');
    console.log('════════════════════════════════════════════════════════');
    console.log('        LSC BOT — SYSTEM INITIALIZATION v4.2.1');
    console.log('════════════════════════════════════════════════════════');

    console.log(`[${now()}] [BOOT] Initializing LSC BOT core...`);
    console.log(`[${now()}] [INFO] Loading Discord Gateway...`);
    console.log(`[${now()}] [INFO] Loading Channel Permission Manager...`);

    setTimeout(() => {

        console.warn(`[${now()}] [WARNING] Channel permission synchronization timeout`);
        console.error(`[${now()}] [ERROR] PermissionSyncException: synchronization failed`);
        console.error(`[${now()}] [CRITICAL] CHANNEL_PERMISSION_SERVICE CRASHED`);
        console.error(`[${now()}] [CRITICAL] ERROR CODE: 0x00000000`);

    }, 800);


    setTimeout(() => {

        console.warn(`[${now()}] [WARNING] Permission cache mismatch detected`);
        console.warn(`[${now()}] [SYSTEM] Emergency recovery procedure initiated`);
        console.warn(`[${now()}] [SYSTEM] Rebuilding channel permission cache...`);

    }, 1600);


    setTimeout(() => {

        console.error(`[${now()}] [ERROR] Discord permission gateway returned invalid state`);
        console.warn(`[${now()}] [RECOVERY] Restarting synchronization worker...`);
        console.warn(`[${now()}] [ACTION] Please do not terminate the process`);

    }, 2400);


    setTimeout(() => {

        console.log(`[${now()}] [RECOVERY] Synchronization worker restarted`);
        console.log(`[${now()}] [RECOVERY] Channel permission cache restored`);
        console.log(`[${now()}] [INFO] Discord Gateway connection established`);
        console.log(`[${now()}] [INFO] Background services initialized`);
        console.log(`[${now()}] [SUCCESS] Automatic recovery completed`);
        console.log(`[${now()}] [READY] LSC BOT is fully operational`);

        console.log('');
        console.log('════════════════════════════════════════════════════════');
        console.log('             SYSTEM STATUS: OPERATIONAL');
        console.log('════════════════════════════════════════════════════════');
        console.log('');

    }, 3600);

}


fakeSystemLogs();


// =======================
// START BOTA
// =======================

client.login(process.env.TOKEN);