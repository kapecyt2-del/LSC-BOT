module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {

        const channel = member.guild.channels.cache.find(
            ch => ch.name === 'logi'
        );

        if (!channel) return;

        channel.send(
            `👋 **Nowy użytkownik:** ${member.user.tag} dołączył na serwer!`
        );

    }
};