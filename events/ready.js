module.exports = {
    name: 'clientReady',
    once: true,

    execute(client) {

        console.log(BOT  jest online!);

        client.user.setPresence({
            activities: [
                {
                    name: 'Los Santos Customs',
                    type: 3
                }
            ],
            status: 'online'
        });

    }
};
