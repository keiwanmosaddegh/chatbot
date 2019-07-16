const API_AI_TOKEN = '34ed0cd82504407eb4a5e1d7324fa3c6';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAZAXO72LvyYBAAlrEl8nAiwBxM6JEnmm00T9r14z0L0JcyRJPVZCXYpy7m117NjHJAYV0hKX2h4ZCk9ajstY9fhCCIxLjDybK6DFyUlzsbHZBPXmzBI8sPc0oXNcXCKNQVdzk2L8Y4UdcYY5nRs2gB0AGGPJnjBcugER4bQZBgZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
        recipient: { id: senderId },
        message: { text },
    }
});
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};