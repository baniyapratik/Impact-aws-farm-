import React, {Component} from 'react';
import Message from './Message';

const axios = require('axios');

class Chatbot extends Component {
    messagesEnd;
    constructor(props){
        super(props);
        this._onchange = this._onchange.bind(this);
        this.state = {
            messages: []
        }
    }
    async df_text_query(text){
        let says= {
            speaks: 'me',
            msg: {
                text: {
                    text:text
                }
            }
        };
        this.setState({messages: [...this.state.messages, says]})
        const res = await axios.post('/api/chatbot/df_text_query', {text});
        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({messages: [...this.state.messages, says]})
        }
    }

    async df_event_query(event){
        const res = await axios.post('/api/chatbot/df_event_query', {event});
        for (let msg of res.data.fulfillmentMessages){
            let says = {
                speaks: 'bot',
                msg:msg
            };
            this.setState({messages: [...this.state.messages, says]});
        }
    }
    renderMessaes(stateMessages){
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
            })
        } else return null;
    }
    componentDidMount(){
        this.df_event_query('Welcome');
    }
    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behaviour: "smooth"});
    }
    _onchange(e) {
        if (e.key === 'Enter'){
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    render(){
        return (
            <div style={{height:400, width:400, float:'right'}}>
                <div id="chatbot" style={{height:'100%', width: '100%', overflow:'auto'}}>
                    <h3 style={{color:'white'}}>Chatbot</h3>
                    {this.renderMessaes(this.state.messages)}
                    <div ref={(el)=>{this.messagesEnd =el;}} 
                        style={{float:'left', clear: 'both'}}>

                    </div>
                    <input name="text" onKeyPress={this._onchange}/>
                </div>
            </div>
        )
    }
}
export default Chatbot;