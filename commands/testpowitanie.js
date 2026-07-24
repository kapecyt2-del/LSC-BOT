const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const path = require('path');
const config = require('../config.json');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('testpowitanie')
        .setDescription('Pokazuje testowe powitanie bez dołączania nowej osoby'),


    async execute(interaction) {


        if (interaction.user.id !== '1214633024063545458') {
            return interaction.reply({
                content: '❌ Nie masz dostępu do tej komendy.',
                ephemeral: true
            });
        }


        const channel = interaction.guild.channels.cache.get(
            config.welcomeChannel
        );


        if (!channel) {

            return interaction.reply({
                content: '❌ Nie znaleziono kanału powitalnego.',
                ephemeral: true
            });

        }



        const embed = new EmbedBuilder()

            .setColor(config.color)

            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })

            .setTitle('🔧 WITAMY W LOS SANTOS CUSTOMS')

            .setDescription(`
👋 Siema ${interaction.member}!

Witamy Cię serdecznie na serwerze **Los Santos Customs** 🔧

🔔 Aby uzyskać więcej informacji:
🎫 <#${config.ticketChannel}>

📝 W tickecie napisz swoje **imię i nazwisko IC**.

🚗 Do zobaczenia w warsztacie!
`)

            .setImage('attachment://banner.png')

            .setThumbnail(
                interaction.user.displayAvatarURL({
                    dynamic: true
                })
            )

            .setFooter({
                text: 'Los Santos Customs'
            })

            .setTimestamp();



        await channel.send({

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

            content: '✅ Wysłano testowe powitanie.',

            ephemeral: true

        });


    }

};