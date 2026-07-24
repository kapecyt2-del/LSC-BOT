const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const path = require('path');
const config = require('../config.json');


module.exports = {

    data: new SlashCommandBuilder()

        .setName('testdm')

        .setDescription('Wysyła testowego DM')

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
👋 Cześć **${user.username}**!

Witamy Cię na serwerze **Los Santos Customs** 🔧

🚗 Chcesz dołączyć do naszej ekipy?

🎫 Stwórz ticket:
<#${config.ticketChannel}>

W tickecie wyślij:

📸 SS swojego ACC
📝 Informacje dotyczące podania
👤 Swoje imię i nazwisko IC

🔧 Do zobaczenia w warsztacie!
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