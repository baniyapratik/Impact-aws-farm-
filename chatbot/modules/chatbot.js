'user strict'
const dialogFlow = require('dialogflow');
const keys = require('../config/keys');
const structjson = require('./structjson');

const sessionClient = new dialogFlow.SessionsClient();
const sessionPath = sessionClient.sessionPath(keys.googleProjectID, keys.dialogFlowSessionID);

module.exports = {
    textQuery: async function(text, parameters={}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text, 
                    languageCode: keys.dialogFlowSessionLanguage,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let response =  await sessionClient.detectIntent(request);
        response = await self.handleAction(response);
        return response;
    },
    handleAction: function(response){
        return response;
    },
    eventQuery: async function(event, parameters={}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event, 
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: keys.dialogFlowSessionLanguage,
                },
            },
        };
        let response =  await sessionClient.detectIntent(request);
        response = await self.handleAction(response);
        return response;
    },
}