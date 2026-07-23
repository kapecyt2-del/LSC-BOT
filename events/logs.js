module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {

        try {

            const channel = member.guild.channels.cache.find(
                ch => ch.name === 'logi' && ch.isTextBased()
            );

            if (!channel) {
                console.log('❌ Nie znaleziono kanału #logi');
                return;
            }


            await channel.send(
                `👋 **Nowy użytkownik:** ${member.user.tag} dołączył na serwer!`
            );


            console.log(`✅ Log wejścia wysłany dla ${member.user.tag}`);


        } catch (error) {

            console.error('❌ Błąd w logs.js:', error);

        }

    }
};
