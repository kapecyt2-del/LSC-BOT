const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Pokazuje status bota'),

    async execute(interaction) {

        const uptime = process.uptime();

        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('🟢 LSC BOT STATUS')
            .addFields(
                {
                    name: '🤖 Bot',
                    value: 'Online',
                    inline: true
                },
                {
                    name: '📡 Ping',
                    value: `${interaction.client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: '⏱ Uptime',
                    value: `${hours}h ${minutes}m ${seconds}s`,
                    inline: true
                },
                {
                    name: '🌐 Render',
                    value: 'Działa ✅',
                    inline: true
                }
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};