
const chatbot = require('../modules/chatbot');
module.exports = app => {
    app.get('/', (req, res)=>{
        res.send({"Hello": "Pratik"});
    });

    app.post('/df_event_query', async (req, res)=>{
        console.log(req.body.text)
        let response = await chatbot.eventQuery(req.body.event, req.body.parameters);
        res.send(response[0].queryResult);
    });
    
    app.post('/df_text_query', async (req, res)=>{
        console.log(req.body.text)
        let response = await chatbot.textQuery(req.body.text, req.body.parameters);
        res.send(response[0].queryResult);
    });
}