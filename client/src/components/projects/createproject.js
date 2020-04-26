import React, { Component } from 'react';
import axios from 'axios';
import * as routes from './../authentication/constants/routes';
import { Form, Button, Modal } from 'react-bootstrap';

const INITIAL_STATE = {
  name: '',
  description: '',
  start_date: '',
  end_date: '',
  owner: '',
  error: null,
  requiredtesters: '',
  show: false,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  onSubmit = (event) => {
    event.preventDefault();
    const createProjectRequest = this.state;
    createProjectRequest.owner = JSON.parse(localStorage.getItem('user'))._id;
    const url = `${routes.BACKEND_SERVER}projects/`;
    axios
      .post(url, createProjectRequest)
      .then((res) => {
        console.log(res);
        this.props.action();
        this.handleClose();
      })
      .catch((err) => {
        console.log(err);
        const error = {
          message: err.response.data.messsage.message,
        };
        this.setState(byPropKey('error', error));
      });
    console.log(createProjectRequest);
  };
  clearError = () => {
    this.setState(byPropKey('error', null));
  };

  getCreateProjectForm = () => {
    const {
      name,
      description,
      start_date,
      end_date,
      error,
      requiredtesters,
    } = this.state;
    const isInvalid = name === '' || description === '';
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    return (
      <>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Project Name">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) =>
                this.setState(byPropKey('name', event.target.value))
              }
            />
            <Form.Text className="text-muted">
              Project name must be more than 10 characters and less than 30
              characters
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="Project Description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={description}
              onChange={(event) =>
                this.setState(byPropKey('description', event.target.value))
              }
              type="text"
              placeholder="Project Description"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Testers Required">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Number of testers required"
              value={requiredtesters}
              onChange={(event) =>
                this.setState(byPropKey('requiredtesters', event.target.value))
              }
            />
            <Form.Text className="text-muted">
              Project should have the number of testers required
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="Project Start Date">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={start_date}
              onChange={(event) =>
                this.setState(byPropKey('start_date', event.target.value))
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="Project End Date">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={end_date}
              onChange={(event) =>
                this.setState(byPropKey('end_date', event.target.value))
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Button disabled={isInvalid} type="submit" variant="secondary">
            Create Project
          </Button>
          {error && (
            <div class="alert alert-danger alert-dismissible fade show login-error">
              <strong>Error!</strong> {error.message}
              <button type="button" class="close" onClick={this.clearError}>
                &times;
              </button>
            </div>
          )}
        </Form>
      </>
    );
  };
  setShow = (bool) => {
    this.setState({ show: bool });
  };
  handleClose = () => this.setShow(false);
  handleShow = () => this.setShow(true);

  render() {
    return (
      <>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.getCreateProjectForm()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CreateProject;
