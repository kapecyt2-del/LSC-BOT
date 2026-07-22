// =======================
// OBSŁUGA SLASH KOMEND
// =======================

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;


    console.log(
        `📌 Komenda: /${interaction.commandName} | Użytkownik: ${interaction.user.tag} (${interaction.user.id}) | Serwer: ${interaction.guild?.name || 'DM'}`
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


        console.log(
            `✅ Wykonano: /${interaction.commandName}`
        );


    } catch (error) {

        console.error(
            `❌ Błąd komendy /${interaction.commandName}:`,
            error
        );


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