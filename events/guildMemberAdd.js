const { EmbedBuilder } = require('discord.js');
const path = require('path');
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
🎫 <#${config.ticketChannel}>

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
                    attachment: path.join(__dirname, '..', 'assets', 'banner.png'),
                    name: 'banner.png'
                }
            ]
        });



        try {

            const dm = new EmbedBuilder()
                .setColor(config.color)
                .setTitle('🔧 Witamy w Los Santos Customs!')
                .setDescription(`
👋 Cześć **${member.user.username}!**

Gratulujemy! Twoje podanie zostało zaakceptowane i oficjalnie dołączasz do zespołu **Los Santos Customs**. 🚗

🎫 **Pierwszym krokiem jest utworzenie ticketa na kanale:**
<#${config.ticketChannel}>

📝 **W tickecie wyślij:**
📸 SS swojego konta (ACC)
🪪 Imię i nazwisko IC

📚 **Po utworzeniu ticketa zapoznaj się z materiałami do testu na Młodszego Mechanika:**
<#1170451221241401464>

Znajdziesz tam wszystkie informacje potrzebne do przygotowania się do testu oraz dalszego awansu w Los Santos Customs.

❓ W razie pytań możesz skontaktować się z Kierownictwem.

🔧 Powodzenia na teście i do zobaczenia w warsztacie!
`)
                .setImage('attachment://banner.png')
                .setFooter({
                    text: 'Los Santos Customs'
                })
                .setTimestamp();


            await member.send({
                embeds: [dm],
                files: [
                    {
                        attachment: path.join(__dirname, '..', 'assets', 'banner.png'),
                        name: 'banner.png'
                    }
                ]
            });


        } catch {
            console.log(`Nie udało się wysłać DM do ${member.user.tag}`);
        }

    }
};