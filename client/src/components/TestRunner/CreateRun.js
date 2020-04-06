import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import VerticalTabs from './VerticalTabs';
import ListRuns from './ListRuns';
import './modal.css';

class CreateTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    render() {
        return (
            <div>
                <Button variant="primary" onClick={() => this.setState({ show: true })}>
                    Create run
            </Button>
                <Modal
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    dialogClassName="modal-90w"
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
                            <VerticalTabs />
                        </div>
                    </Modal.Body>
                </Modal>
                <div>
                    <ListRuns />
                </div>
            </div>
        )
    }
}

export default CreateTest;