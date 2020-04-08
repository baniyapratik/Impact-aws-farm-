import axios from 'axios';
import React, { Component } from 'react';
import * as routes from '../authentication/constants/routes';

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
      <div>
        <h3>Update Project</h3>
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
            Update
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default UpdateProject;
