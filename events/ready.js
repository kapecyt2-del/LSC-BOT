module.exports = {
    name: 'clientReady',
    once: true,

    execute(client) {

        console.log(`✅ ${client.user.tag} jest online!`);

        client.user.setActivity('Los Santos Customs 🔧', {
            type: 3
        });

    }
};