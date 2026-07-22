const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'guildMemberAdd',

    async execute(member) {

        const channel = member.guild.channels.cache.get(config.welcomeChannel);

        if (!channel) return;


        const embed = new EmbedBuilder()
            .setColor(config.color)
            .setAuthor({
                name: member.user.tag,
                iconURL: member.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('🔧 WITAMY W LOS SANTOS CUSTOMS')
            .setDescription(`
👋 Siema ${member}!

Witamy Cię serdecznie na serwerze **Los Santos Customs** 🔧

🔔 Aby uzyskać więcej informacji:
🎫 <#1483021913583390765>

📝 W tickecie napisz swoje **imię i nazwisko IC**.

🚗 Do zobaczenia w warsztacie!
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


        try {

            const dm = new EmbedBuilder()
                .setColor(config.color)
                .setTitle('🔧 Witamy w Los Santos Customs!')
                .setDescription(`
👋 Cześć **${member.user.username}**!

Witamy Cię na serwerze **Los Santos Customs** 🔧

📖 Zapoznaj się z regulaminem oraz najważniejszymi informacjami dostępnymi na serwerze.

🎫 W razie pytań lub problemów skontaktuj się z administracją.

🚗 Życzymy miłej gry i do zobaczenia w warsztacie!
`)
                .setImage('attachment://banner.png')
                .setFooter({
                    text: 'Los Santos Customs'
                });


            await member.send({
                embeds: [dm],
                files: [
                    {
                        attachment: './assets/banner.png',
                        name: 'banner.png'
                    }
                ]
            });


        } catch {
            console.log(`Nie udało się wysłać DM do ${member.user.tag}`);
        }

    }
};