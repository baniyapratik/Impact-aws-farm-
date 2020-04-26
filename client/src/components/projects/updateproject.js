import axios from 'axios';
import React, { Component } from 'react';
import * as routes from '../authentication/constants/routes';
import { Form, Button } from 'react-bootstrap';
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const updateProjectRequest = this.state;
    const url = `${routes.BACKEND_SERVER}projects/${updateProjectRequest.id}`;
    axios
      .patch(url, updateProjectRequest)
      .then((res) => {
        console.log(res);
        this.props.action();
      })
      .catch((err) => {
        console.log(err);
        const error = {
          message: err.message,
        };
        this.setState(byPropKey('error', error));
      });
    console.log(updateProjectRequest);
  };

  formatDate = (datestring) => {
    const date = new Date(datestring);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const dateString =
      year +
      '-' +
      (month <= 9 ? '0' + month : month) +
      '-' +
      (day <= 9 ? '0' + day : day);
    return dateString;
  };

  render() {
    const { name, description, error } = this.state;
    const start_date = this.formatDate(this.state.start_date);
    const end_date = this.formatDate(this.state.end_date);
    const isInvalid = name === '' || description === '';
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    return (
      <>
        <hr></hr>
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
            Update
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </>
    );
  }
}

export default UpdateProject;
