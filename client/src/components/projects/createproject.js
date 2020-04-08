import React, { Component } from 'react';
import axios from 'axios';
import * as routes from './../authentication/constants/routes';

const INITIAL_STATE = {
  name: '',
  description: '',
  start_date: '',
  end_date: '',
  owner: '',
  error: null,
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
      })
      .catch((err) => {
        console.log(err);
        const error = {
          message: err.message,
        };
        this.setState(byPropKey('error', error));
      });
    console.log(createProjectRequest);
  };

  render() {
    const { name, description, start_date, end_date, error } = this.state;
    const isInvalid = name === '' || description === '';
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    return (
      <div>
        <h3>Create Projects</h3>
        <form onSubmit={this.onSubmit}>
          <input
            value={name}
            onChange={(event) =>
              this.setState(byPropKey('name', event.target.value))
            }
            type="text"
            placeholder="Project Name"
          />
          <textarea
            value={description}
            onChange={(event) =>
              this.setState(byPropKey('description', event.target.value))
            }
            type="text"
            placeholder="Project Description"
          />
          <input
            value={start_date}
            onChange={(event) =>
              this.setState(byPropKey('start_date', event.target.value))
            }
            min={new Date().toLocaleDateString()}
            type="date"
          />
          <input
            value={end_date}
            onChange={(event) =>
              this.setState(byPropKey('end_date', event.target.value))
            }
            min={tommorow}
            type="date"
          />

          <button disabled={isInvalid} type="submit">
            Create Project
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default CreateProject;
