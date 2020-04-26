import React, { Component } from 'react';
import axios from 'axios';
import { Accordion, Card, Button, Nav } from 'react-bootstrap';
import * as routes from './../authentication/constants/routes';

class AppStart extends Component {
  constructor(props) {
    super(props);
  }

  handleRunTest = (e) => {
    axios
      .post(routes.AWS_SERVICE + '/aws-testrunner/run', null)
      .then((response) => {
        console.log(response); // do something with the response
      });
    this.props.handleModal();
  };

  render() {
    return (
      <div>
        <h3>Review and start run</h3>
        <br></br>
        <div>
          Review your run below. Look good? Confirm to start your run.
          Interested in unlimited, unmetered testing?
          <Nav.Item>
            <Nav.Link eventKey="link-1">Learn more</Nav.Link>
          </Nav.Item>
        </div>
        <br></br>
        <center>
          <Accordion>
            <Card bg="dark" text="white">
              <Card.Header style={{ backgroundColor: '#414f47' }}>
                <Accordion.Toggle as={Button} variant="success" eventKey="0">
                  Application
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <strong>Name</strong> demo.apk
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card bg="dark" text="white">
              <Card.Header style={{ backgroundColor: '#414f47' }}>
                <Accordion.Toggle as={Button} variant="success" eventKey="1">
                  Test
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Card.Body>
                    <strong>Type</strong> Appium_TestNG
                  </Card.Body>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card bg="dark" text="white">
              <Card.Header style={{ backgroundColor: '#414f47' }}>
                <Accordion.Toggle as={Button} variant="success" eventKey="2">
                  Devices
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <Card.Body>
                    <strong>Pool</strong> Top Devices
                  </Card.Body>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Button
            onClick={this.handleRunTest.bind(this)}
            variant="secondary"
            style={{ marginTop: '15px' }}
          >
            Confirm and start run
          </Button>{' '}
        </center>
      </div>
    );
  }
}

export default AppStart;
