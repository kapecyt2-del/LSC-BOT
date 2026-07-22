const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberRemove',

    async execute(member) {

        const channel = member.guild.channels.cache.get(config.welcomeChannel);

        if (!channel) return;


        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({
                name: member.user.tag,
                iconURL: member.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('🚪 OPUŚCIŁ LOS SANTOS CUSTOMS')
            .setDescription(`
👋 **${member.user.username}** opuścił nasz warsztat.

🚗 Wyjechał bokiem z garażu **Los Santos Customs** i zakończył swoją wizytę.

🔧 Dziękujemy za wspólnie spędzony czas oraz mamy nadzieję, że jeszcze kiedyś zawitasz do naszego warsztatu!
`)
            .setImage('attachment://banner.png')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter({
                text: 'Los Santos Customs'
            })
            .setTimestamp();


        await channel.send({
            embeds: [embed],
            files: [
                {
                    attachment: './assets/banner.png',
                    name: 'banner.png'
                }
            ]
        });

    }
};