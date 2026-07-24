require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { REST, Routes } = require('discord.js');


const commands = [];


const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));


for (const file of commandFiles) {

    const command = require(path.join(commandsPath, file));

    commands.push(command.data.toJSON());

    console.log(`✅ Dodano komendę: ${command.data.name}`);

}


const rest = new REST({ version: '10' })
    .setToken(process.env.TOKEN);



(async () => {

    try {


        console.log('🗑️ Usuwanie starych globalnych komend...');


        await rest.put(

            Routes.applicationCommands(
                process.env.CLIENT_ID
            ),

            {
                body: []
            }

        );


        console.log('✅ Globalne komendy usunięte!');



        console.log('🔄 Rejestrowanie komend serwerowych...');


        await rest.put(

            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),

            {
                body: commands
            }

        );


        console.log('✅ Komendy serwerowe zarejestrowane!');


    } catch (error) {

        console.error(error);

    }

})();