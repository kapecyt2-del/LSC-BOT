const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ogloszenie')
        .setDescription('Wysyła ogłoszenie na wybrany kanał')
        .addChannelOption(option =>
            option
                .setName('kanal')
                .setDescription('Kanał, na który ma zostać wysłane ogłoszenie')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('wiadomosc')
                .setDescription('Treść ogłoszenia')
                .setRequired(true)
        ),

    async execute(interaction) {

        const zarzadRole = '1143211475637387407';
        const ownerId = '1214633024063545458';

        const hasPermission =
            interaction.user.id === ownerId ||
            interaction.member.roles.cache.has(zarzadRole);

        if (!hasPermission) {
            return interaction.reply({
                content: '❌ Nie masz uprawnień do tej komendy.',
                ephemeral: true
            });
        }

        const kanal = interaction.options.getChannel('kanal');
        const wiadomosc = interaction.options.getString('wiadomosc');

        try {

            await kanal.send(wiadomosc);

            await interaction.reply({
                content: `✅ Ogłoszenie zostało wysłane na ${kanal}.`,
                ephemeral: true
            });

        } catch (error) {

            console.error(error);

            await interaction.reply({
                content: '❌ Nie mogę wysłać wiadomości na ten kanał. Sprawdź uprawnienia bota.',
                ephemeral: true
            });
        }
    }
};