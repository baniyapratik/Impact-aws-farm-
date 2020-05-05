import React, { Component } from 'react';
import Message from './Message';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import DialogFlow from './DialogFlow';
import PropTypes from 'prop-types';
const axios = require('axios');

let interactivemessagecounter = 1;

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);
    this._onchange = this._onchange.bind(this);
    this.state = {
      messages: [],
      result: '',
      trigger: false,
    };
    let helpmessage = {
      id: 'helpmessage',
      message: 'How can I help you?',
      trigger: 'InteractiveMessage',
    };
    this.state.messages.push(helpmessage);
    let userinputmessage = {
      id: 'InteractiveMessage',
      user: true,
      trigger: 'BotResponse',
    };
    this.state.messages.push(userinputmessage);
    let botResponse = {
      id: 'BotResponse',
      component: <DialogFlow />,
      waitAction: true,
      trigger: 'InteractiveMessage'
    };
    this.state.messages.push(botResponse);
  }

  async df_event_query(event) {
    try {
      const res = await axios.post('/api/chatbot/df_event_query', { event });
      let i = 1;
      const messages = this.state.messages;
      const length = res.data.fulfillmentMessages.length;
      for (let msg of res.data.fulfillmentMessages) {
        let message;
        if (i == length - 1) {
          message = {
            id: 'Welcome' + i,
            message: msg,
            trigger: 'helpmessage',
          };
        } else {
          message = {
            id: 'Welcome' + i,
            message: msg,
            trigger: 'Welcome' + (i + 1),
          };
        }
        i++;
        messages.push(message);
      }
      let helpmessage = {
        id: 'helpmessage',
        message: 'How can I help you?',
        trigger: 'InteractiveMessage',
      };
      messages.push(helpmessage);
      let userinputmessage = {
        id: 'InteractiveMessage',
        user: true,
        trigger: 'BotResponse',
      };
      messages.push(userinputmessage);
      let botResponse = {
        id: 'BotResponse',
        component: <DialogFlow />,
        waitAction: true,
        trigger: 'InteractiveMessage'
      };
      messages.push(botResponse);
      this.setState({ messages: messages });
    } catch (err) {
      console.log(err);
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        );
      });
    } else return null;
  }
  componentDidMount() {
    this.df_event_query('Welcome').then(() => {});
  }
  componentDidUpdate() {}
  _onchange(e) {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value);
      e.target.value = '';
    }
  }
  render() {
    const config = {
      width: '300px',
      height: '400px',
      floating: true,
    };

    const theme = {
      background: 'white',
      fontFamily: 'Arial, Helvetica, sans-serif',
      headerBgColor: '#197547',
      headerFontColor: '#fff',
      headerFontSize: '25px',
      botBubbleColor: '#197547',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4c4c4c',
    };

    const messages = this.state.messages;
    console.log(messages);
    return (
      <ThemeProvider theme={theme}>
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: 'left', clear: 'both' }}
          ></div>
        <ChatBot steps={messages} {...config} />
      </ThemeProvider>
    );

    return (
      <div style={{ height: 400, width: 400, float: 'right' }}>
        <div
          id="chatbot"
          style={{ height: '100%', width: '100%', overflow: 'auto' }}
        >
          <h3 style={{ color: 'white' }}>Chatbot</h3>
          {this.renderMessages(this.state.messages)}
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: 'left', clear: 'both' }}
          ></div>
          <input name="text" onKeyPress={this._onchange} />
        </div>
      </div>
    );
  }
}
export default Chatbot;
