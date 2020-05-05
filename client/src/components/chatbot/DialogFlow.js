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

    for (let msg of res.data.fulfillmentMessages) {
      response = response + msg.text.text[0] + '<br>';
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
    return <>{value}</>;
  }
}

export default DialogFLow;
