const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const config = require('../config.json');


module.exports = {

    data: new SlashCommandBuilder()
        .setName('testpozegnanie')
        .setDescription('Pokazuje testowe pożegnanie bez wychodzenia z serwera'),


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
                content: '❌ Nie znaleziono kanału.',
                ephemeral: true
            });

        }


        const embed = new EmbedBuilder()

            .setColor('#ff0000')

            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })

            .setTitle('🚪 OPUŚCIŁ LOS SANTOS CUSTOMS')

            .setDescription(`
👋 **${interaction.user.username}** opuścił nasz warsztat.

🚗 Wyjechał bokiem z garażu **Los Santos Customs** i zakończył swoją wizytę.

🔧 Dziękujemy za wspólnie spędzony czas oraz mamy nadzieję, że jeszcze kiedyś zawitasz do naszego warsztatu!
`)

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
            embeds: [embed]
        });



        await interaction.reply({
            content: '✅ Wysłano testowe pożegnanie.',
            ephemeral: true
        });


    }

};