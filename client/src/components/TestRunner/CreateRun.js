import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import VerticalTabs from './VerticalTabs';
import ListRuns from './ListRuns';
import './testrunner.css';

class CreateTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      project: props,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <center>
          <hr></hr>
          <i>
            Automated runs allow you to execute built-in tests or your own
            scripts on one or more devices in parallel, generating a
            comprehensive report that includes high-level results, logs,
            screenshots, and performance data.
          </i>
          <br></br>
          <Button
            variant="secondary"
            onClick={() => this.setState({ show: true })}
            style={{ marginTop: '15px' }}
          >
            Create a new run
          </Button>
          <br></br>
          <Modal
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
            size="lg"
            style={{ width: '50%', position: 'fixed', left: '25%' }}
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Create Run
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <VerticalTabs
                  closeModal={this.closeModal}
                  {...this.state.project}
                />
              </div>
            </Modal.Body>
          </Modal>
          <div>
            <ListRuns />
          </div>
        </center>
      </div>
    );
  }
}

export default CreateTest;
