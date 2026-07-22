const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restartuje bota'),

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


        await interaction.reply({
            content: '🔄 Restartuję bota...',
        });


        setTimeout(() => {
            process.exit(0);
        }, 1000);

    }
};