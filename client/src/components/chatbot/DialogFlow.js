import React, { Component } from 'react';
const axios = require('axios');

let response = '';

class DialogFLow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.value = this.props.previousStep.value;
    this.state.props = this.props;
    this.state.flag = false;
    this.state.responseValue = '';
  }

  async df_text_query(text) {
    const res = await axios.post('/api/chatbot/df_text_query', { text });

    const messages = res.data.fulfillmentMessages;
    let i = 0;
    response = '';
    for (i = 0; i < messages.length; i++) {
      response = response + messages[i].text.text[0];
    }
  }

  componentDidMount() {
    if (!this.state.flag) {
      this.df_text_query(this.state.value)
        .then(() => {
          this.setState({ responseValue: response });
          this.state.props.triggerNextStep();
          this.setState({ flag: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            responseValue: 'So sorry cannot help you at this time ',
          });
          this.state.props.triggerNextStep();
          this.setState({ flag: false });
        });
    }
  }

  render() {
    const value = this.state.responseValue;
    return (
      <div class="card bg-primary text-white">
    <div class="card-body">Bot: {value}</div>
  </div>
    )
  }
}

export default DialogFLow;
