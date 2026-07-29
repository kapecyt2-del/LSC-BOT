const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const path = require('path');
const config = require('../config.json');


module.exports = {

    data: new SlashCommandBuilder()

        .setName('testdm')

        .setDescription('Wysyła testowego DM sprawdzającego wiadomość dla nowych osób')

        .addUserOption(option =>
            option
                .setName('uzytkownik')
                .setDescription('Osoba do wysłania DM')
                .setRequired(true)
        ),


    async execute(interaction) {


        if (interaction.user.id !== '1214633024063545458') {
            return interaction.reply({
                content: '❌ Nie masz dostępu do tej komendy.',
                ephemeral: true
            });
        }


        const user = interaction.options.getUser('uzytkownik');


        const embed = new EmbedBuilder()

            .setColor(config.color)

            .setTitle('🔧 Witamy w Los Santos Customs!')

            .setDescription(`
👋 Cześć **${user.username}!**

Gratulujemy! Twoje podanie zostało zaakceptowane i oficjalnie dołączasz do zespołu **Los Santos Customs**. 🚗

🎫 **Pierwszym krokiem jest utworzenie ticketa na kanale:**
<#${config.ticketChannel}>

📝 **W tickecie wyślij:**
📸 SS swojego konta (ACC)
🪪 Imię i nazwisko IC

📚 **Po utworzeniu ticketa zapoznaj się z materiałami do testu na Młodszego Mechanika:**
<#1170451221241401464>

Znajdziesz tam wszystkie informacje potrzebne do przygotowania się do testu oraz dalszego awansu w Los Santos Customs.

❓ W razie pytań możesz skontaktować się z Kierownictwem.

🔧 Powodzenia na teście i do zobaczenia w warsztacie!
`)

            .setImage('attachment://banner.png')

            .setFooter({
                text: 'Los Santos Customs'
            });


        try {

            await user.send({

                embeds: [embed],

                files: [
                    {
                        attachment: path.join(
                            __dirname,
                            '..',
                            'assets',
                            'banner.png'
                        ),
                        name: 'banner.png'
                    }
                ]

            });


            await interaction.reply({

                content: `✅ Wysłano DM do ${user}.`,

                ephemeral: true

            });


        } catch {

            await interaction.reply({

                content: '❌ Nie mogę wysłać DM do tej osoby.',

                ephemeral: true

            });

        }


    }

};